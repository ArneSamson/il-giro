import { Mesh, Object3D, OrthographicCamera, PerspectiveCamera, Vector2, Vector3 } from "three";
import { useThreeGlobal } from "./useThreeGlobal.tsx";
import { RootState, useThree } from "@react-three/fiber";
// import { MeshVanillaIkeaMaterial } from "../../materials/MeshIkeaMaterial";
// import { MeshIkeaMaterialProps } from "../MeshIkeaMaterial";
import { Options } from "browser-image-compression";
import imageCompression from "browser-image-compression";

export type UseCaptureOptions = {
    width?: number;
    height?: number;
    cameraParameters?: {
        fov?: number;
        aspect?: number;
        near?: number;
        far?: number;
    };
    position?: Vector3 | Vector3[];
    lookAt?: Vector3 | Vector3[];
    compress?: boolean;
    compressOptions?: Options;
    customCamera?: PerspectiveCamera | OrthographicCamera;
    openInNewTab?: boolean;
    ikea?: {
        enabled: boolean;
        include?: string[];
    } & MeshIkeaMaterialProps;
};

const captureArgs: Required<Omit<UseCaptureOptions, "customCamera">> = {
    width: 1920,
    height: 1080,
    cameraParameters: {},
    lookAt: new Vector3(0, 0, 0.001), // 0.001 to prevent accidental camera rotation
    compress: false,
    compressOptions: {
        maxSizeMB: 0.5,
        useWebWorker: false,
    },
    position: new Vector3(0, 5, 5),
    ikea: {
        enabled: false,
        include: [],
    },
    openInNewTab: false,
};

export function useCapture() {
    // let three: RootState | undefined;
    // try {
    //     // three = useThree();
    // } catch (error) {
    //     three = globalThree;
    // }

    const { three } = useThreeGlobal();

    const capture = async (object3d: Object3D, options: UseCaptureOptions = captureArgs): Promise<string[]> => {
        const { width, height, cameraParameters, compress, ikea, position, lookAt, compressOptions } = {
            ...captureArgs,
            ...options,
        };

        async function getImages() {
            if (!three) {
                throw new Error("three is not available, this function uses useThreeGlobal if used outside the Canvas.");
            }
            const { scene, gl, camera } = three;

            const size = new Vector2();
            gl.getSize(size);
            const captureCamera =
                options.customCamera ||
                new PerspectiveCamera(
                    cameraParameters?.fov,
                    cameraParameters?.aspect || width / height,
                    cameraParameters?.near,
                    cameraParameters?.far
                );
            scene.add(camera);
            gl.setSize(width / 2, height / 2);

            let renderObject = object3d;

            if (ikea?.enabled) {
                const clone = object3d.clone();
                clone.traverse((obj) => {
                    if (!(obj instanceof Mesh)) return;
                    if (ikea.include?.length) {
                        if (ikea.include.includes(obj.name)) {
                            obj.material = new MeshVanillaIkeaMaterial({ ...ikea });
                            return;
                        }

                        let parent = obj.parent;
                        while (parent) {
                            if (ikea.include.includes(parent.name)) {
                                obj.material = new MeshVanillaIkeaMaterial({ ...ikea });
                            }
                            parent = parent.parent;
                        }
                    } else {
                        obj.material = new MeshVanillaIkeaMaterial({ ...ikea });
                    }
                });
                renderObject = clone;
                gl.render(clone, captureCamera);
            }

            const positions = Array.isArray(position) ? position : [position];
            const lookAts = Array.isArray(lookAt) ? lookAt : [lookAt];

            const length = Math.max(positions.length, lookAts.length);
            const images = [];
            for (let i = 0; i < length; i++) {
                const capturePosition = positions[i] || positions.at(-1);
                const captureLookAt = lookAts[i] || lookAts.at(-1);
                captureCamera.position.copy(capturePosition);
                captureCamera.lookAt(captureLookAt);
                console.log(renderObject);
                gl.render(renderObject, captureCamera);

                const base64Image = gl.domElement.toDataURL("image/png", 1);

                images.push(base64Image);
            }

            // set back to original state
            scene.remove(captureCamera);
            gl.setSize(size.x, size.y);
            gl.render(scene, camera);

            if (!compress) return images;

            const compressedImages: string[] = [];

            const compressImage = async (image: string) => {
                const file = await imageCompression.getFilefromDataUrl(image, "image.png");
                const compressed = await imageCompression(file, compressOptions);
                return await imageCompression.getDataUrlFromFile(compressed);
            };

            // Compress images concurrently using Promise.all
            const compressPromises = images.map(compressImage);
            const compressedResults = await Promise.all(compressPromises);

            compressedImages.push(...compressedResults);

            return compressedImages;
        }

        const results: string[] = await getImages();
        if (options.openInNewTab) {
            for (let i = 0; i < results.length; i++) {
                const image = results[i];
                const _window = window.open("about:blank");
                const img = new Image();
                img.src = image;

                if (_window) {
                    setTimeout(function () {
                        _window.document.write(img.outerHTML);
                    }, 0);
                }
            }
        }

        return results;
    };

    return { capture };
}
