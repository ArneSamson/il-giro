import { Cache, Loader, LoadingManager, Texture } from "three";
export const CACHE_PREFIX = "FLUX-TEXTURES-";

export type CloneId = string | number | undefined;
export type FetchCache = Promise<HTMLImageElement> | "fulfilled" | undefined;
class CustomTextureLoader extends Loader {
    public controller: AbortController | undefined;
    constructor(manager?: LoadingManager) {
        super(manager);
    }

    setController(controller: AbortController) {
        this.controller = controller;
    }

    async loadPath(
        url: string,
        onLoading?: (data?: unknown) => void,
        id?: CloneId
    ) {
        if (this.path !== undefined) url = this.path + url;

        Cache.enabled = true;

        const fetching: FetchCache = Cache.get(`fetching-${url}`);
        const cached = Cache.get(CACHE_PREFIX + url);

        if (fetching && cached) {
            cached.needsUpdate = true;

            if (fetching === "fulfilled" && cached) {
                if (id !== undefined) {
                    return this.getClone(cached, url, id);
                }
                return cached;
            } else {
                await fetching;
            }
        }

        if (cached) {
            if (id !== undefined) {
                return this.getClone(cached, url, id);
            }
            return cached;
        }

        const texture = new Texture();
        Cache.add(CACHE_PREFIX + url, texture);

        const promise = this.loadImage(url, onLoading);
        Cache.add(`fetching-${url}`, promise);
        const image = await promise;
        texture.image = image;
        texture.needsUpdate = true;

        return texture;
    }

    private getClone(texture: Texture, path: string, id: CloneId) {
        const clonePath = CACHE_PREFIX + path + `/?id=${id}`;
        const cachedClone = Cache.get(clonePath);

        if (cachedClone) return cachedClone;

        const clone = texture.clone();
        Cache.add(clonePath, clone);
        return clone;
    }

    private loadImage(url: string, onLoading?: () => void) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            if (onLoading) onLoading();

            const image = new Image();
            // Create a Blob URL for the fetched image data
            fetch(url, { signal: this.controller?.signal })
                .then((response) => response.blob())
                .then((blob) => {
                    const objectURL = URL.createObjectURL(blob);

                    // Set the source of the Image object to the Blob URL
                    image.src = objectURL;
                    image.onload = () => {
                        // Image has been loaded
                        URL.revokeObjectURL(objectURL);
                        Cache.add(`fetching-${url}`, "fulfilled");
                        resolve(image);
                    };
                    image.onerror = () => {
                        // Error loading the image
                        URL.revokeObjectURL(objectURL);
                        reject(new Error("Failed to load image."));
                    };
                })
                .catch((error) => {
                    console.error({ error });

                    // Make sure a refetch can be tried.
                    Cache.remove(CACHE_PREFIX + url);
                    Cache.remove(`fetching-${url}`);

                    // Error fetching the image
                    reject(error);
                });
        });
    }

    abort() {
        if (this.controller) {
            //this.controller.abort("Loading texture aborted.");
        }
    }
}

export { CustomTextureLoader };
