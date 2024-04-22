# Il Giro

Outdoor kitchen configurator for Studio Rombauts

## important notes

`tableTop` is used in code and `counterTop` in the UI. They mean the same thing and may be used interchangeably in this document.

### Index

<table>
  <tr>
    <td valign="top">
      <ul>
        <li><a href="#structure">Structure</a></li>
        <ul>
            <li><a href="#appjsx">App</a></li>
            <ul>
            <li><a href="#canvas-tag">Canvas Tag</a></li>
            </ul>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#scene">Scene</a></li>
            <li><a href="#modules">Modules</a></li>
            <ul>
                <li><a href="#baseisland">BaseIsland</a></li>
                <li><a href="#sink">Sink</a></li>
                <li><a href="#cooktop">Cooktop</a></li>
                <li><a href="#tower">Tower</a></li>
                <li><a href="#table">Table</a></li>
            </ul>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#helpers">Helpers</a></li>
        <ul>
            <li><a href="#newmaterial">NewMaterial</a></li>
            <li><a href="#usetexture">useTexture</a></li>
            <li><a href="#usecapture">useCapture</a></li>
        </ul>
                <li><a href="#controls">Store</a></li>
        <ul>
            <li><a href="#useconfigstore">useConfigStore</a></li>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#extras">Extras</a></li>
        <ul>
          <li><a href="#perf">Perf</a></li>
          <li><a href="#zustand">Zustand</a></li>
        </ul>
        <li><a href="#extras">PDF</a></li>
        <ul>
          <li><a href="#perf">Perf</a></li>
        </ul>
      </ul>
    </td>

  </tr>
</table>

# structure

### App

App.jsx is the main entry point for the application. It is where the Canvas, Loader and UI are loaded.

#### Canvas tag

Inside the Canvas tag, the postprocessing effetcs are loaded as `<Effects/>`. The full 3D experience is loaded as `<Experience/>` inside the Canvas tag.

### Experience

Experience.jsx is where the actual 3D scene is loaded, togheter with the camera, lights and environment

### Scene

Scene.jsx is where the 4 possible kitchen modules are conditionally loaded, based on the boolean state in the Zustand store.

### Modules

The modules are the actual kitchen modules that are loaded in the Scene component. There are 4 modules: `sink`, `cooktop`, `tower` and `table`.

For the shadows of the modules, a shadow plane with a baked shadow texture is used. ShadowPlanes.jsx eports a small and a large shadowplane. The small shadow plane is loaded in the `<BaseIsland/>` component, and thus reused in the `<sink/>`, `<cooktop/>` and `<table/>` components. The large shadow plane is loaded in the `<tower/>` module.

#### BaseIsland

Important! The `<BaseIsland/>` is a component that is reused in the `sink`, `cooktop` and `table` module. This is the textured base of the kitchen modules. Togheter with a tableTop and appliances (like a faucet or a cooking fire) the modules are made.

If the prop `needsDrawers` is `true`, then the baseIsland is loaded with the drawers. If `needsDrawers` is `false`, then the baseIsland is loaded without the drawers. It conditionally uses another .glb file for the geometry of the baseIsland

```jsx
const { nodes } = useGLTF(
  needsDrawers ? "./models/base-island-drawers.glb" : "./models/base-island.glb"
);
```

and it conditionally loads the drawers.

#### Sink

The `Sink` module is one of 4 the kitchen modules. It is a combination of the `<BaseIsland/>` component, the `<Reginox/>` sink component, a `tableTop` component, and either the `<Tap1/>` or `<Tap2/>` component. It conditionally renders which faucet it has, whether the sink has drawers or not, and whether the sink has a rounded countertop or not.

#### Cooktop

The `Cooktop` module is one of 4 the kitchen modules. It is a combination of the `<BaseIsland/>` component, the `<GasStove/>` or `<ElectricStove/>` component, and a `tableTop` component It conditionally renders whether the cooktop has drawers or not, wheter it needs a gas or electric cooking fire, and whether the cooktop has a rounded countertop or not.

#### Tower

# Helpers

### NewMaterial

This is a self written component that creates a new material based on the parameters passed to it. It is used to create the materials for every kitchen module or appliance that needs to take over a kitchen module material.

Parameters are:

- `ambientOcclusion`: string (path to the ambient occlusion texture)
- `type`: string (which type of module it is, or of which module it should have the same material)
- `ralExclude`: boolean (if the material should be excluded of getting a RAL color)
- `envIntensity`: number (the intensity of the environment map)

### useTexture

A custom texture loader written by Aaron. It is used instead of the useTexture from drei because this custom textureloader allows for waiting until the textures are loaded before they're applied to the material.

### useCapture

A custom hook written by Aaron that captures an image of the 3D scene.

It is used in the `PDFBUtton.jsx` file. When the page with the button is loaded, it will take a capture of the current configuration and store it as a base64 string. This string is then passed as a prop to the PDF component which builds the PDF with this image.

# Extras

#### Perf

Perf is a component that shows the current FPS and ms of the application. It is loaded in the Experience.jsx file.

#### Zustand

Zustand is a state management library that is used to manage the state of the application. It is used to manage the state of the kitchen modules, the camera and the controls. The Zustand store is loaded in every component that needs a value from the store.

example:

```jsx
import useConfigStore from "../../store/useConfigStore.jsx";

const { allBevelled } = useConfigStore((state) => ({
  allBevelled: state.allBevelled,
}));
```

The `(state) => ({allBevelled: state.allBevelled,})` is required at every store call to avoid rerenders.
