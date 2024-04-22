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
            <li><a href="#kitchen-modules">Kitchen modules</a></li>
            <ul>
                <li><a href="#shadows">Shadows</a></li>
                <li><a href="#bevels">Bevels</a></li>
                <li><a href="#lerping">Lerping</a></li>
            </ul>
            <ul>
            <li><a href="#base-components">Base components</a></li>
            <ul>
                <li><a href="#baseisland">BaseIsland</a></li>
                <li><a href="#sink">Sink</a></li>
                <li><a href="#cooktop">Cooktop</a></li>
                <li><a href="#tower">Tower</a></li>
                <li><a href="#table">Table</a></li>
            </ul>
            <li><a href="#tabletopscountertops">Tabletops/Countertops</a></li>
            <li><a href="#accesoires">Accesoires</a></li>
            </ul>
            <li><a href="#lighting-shadows--environment">Lighting Shadows & Environment</a></li>
            <ul>
                <li><a href="#env">Env</a></li>
                <li><a href="#lights">Lights</a></li>
                <li><a href="#shadowplanes">ShadowPlanes</a></li>
            </ul>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#ui">UI</a></li>
        <ul>
            <li><a href="#configui">ConfigUI</a></li>
            <ul>
                <li><a href="#ui-pages">UI pages</a></li>
                <li><a href="#ui-components">UI components</a></li>
                <li><a href="#pdf">PDF</a></li>
            </ul>
        </ul>
        <li><a href="#helpers">Helpers</a></li>
        <ul>
            <li><a href="#newmaterial">NewMaterial</a></li>
            <li><a href="#usetexture">useTexture</a></li>
            <li><a href="#usecapture">useCapture</a></li>
        </ul>
        <li><a href="#stores">Store</a></li>
        <ul>
            <li><a href="#useconfigstore">useConfigStore</a></li>
            <li><a href="#usescene">useScene</a></li>
            <li><a href="#useuistore">useUIStore</a></li>
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
      </ul>
    </td>

  </tr>
</table>

# structure

## App

App.jsx is the main entry point for the application. It is where the Canvas, Loader and UI are loaded.

#### Canvas tag

Inside the Canvas tag, the postprocessing effetcs are loaded as `<Effects/>`. The full 3D experience is loaded as `<Experience/>` inside the Canvas tag.

## Experience

Experience.jsx is where the actual 3D scene is loaded, togheter with the camera, lights and environment

## Scene

Scene.jsx is where the 4 possible kitchen modules are conditionally loaded, based on the boolean state in the Zustand store.

## Kitchen Modules

The modules are the actual kitchen modules that are loaded in the Scene component. There are 4 modules: `sink`, `cooktop`, `tower` and `table`.

#### Shadows

For the shadows of the modules, a shadow plane with a baked shadow texture is used. `ShadowPlanes.jsx` exports a small (`<BakePlaneSmall>`) and a large (`<BakePlane>`) shadowplane. The small shadow plane is loaded in the `<BaseIsland/>` component, and thus reused in the `<Sink/>`, `<Cooktop/>` and `<Table/>` components. The large shadow plane is loaded in the `<Tower/>` module.

#### Bevels

For the bevelling of the modules, a beveled and a straight underside are modelled as children of the modules. These are conditionally rendered based on the state of the `allBevelled` boolean in the Zustand store.

#### Lerping

The `<Drawers/>` and `<BaseIsland/>` use lerping for the opening and closing of the drawers or doors. This is done by using the `useFrame` hook from drei.

A good example can be found in the `<Drawers/>` component inside Drawers.jsx.

### Base components

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

The `<Sink/>` component is one of 4 the kitchen modules. It is a combination of the `<BaseIsland/>` component, the `<Reginox/>` sink component, a `tableTop` component, and either the `<Tap1/>` or `<Tap2/>` component. It conditionally renders which faucet it has, whether the sink has drawers or not, and whether the sink has a rounded countertop or not.

It also conditionally sets the thickness of the countertop with a combiantion of switch cases and if-else statement, based on which material the countertop is made of, and if the user selected a specific thickness of the countertop.

#### Cooktop

The `<Cooktop/>` component is one of 4 the kitchen modules. It is a combination of the `<BaseIsland/>` component, the `<GasStove/>` or `<ElectricStove/>` component, and a `tableTop` component It conditionally renders whether the cooktop has drawers or not, wheter it needs a gas or electric cooking fire, and whether the cooktop has a rounded countertop or not.

#### Tower

The `<Tower/>` component is one of 4 the kitchen modules. It is a big .glb model where certain children of the model are conditionally rendered based on the states from the Zustand store. It also includes the `<WineStand/>` component.

#### Table

The `<Table/>` component is one of 4 the kitchen modules. It is a combination of 2 `<BaseIsland/>` components and a `tableTop` component. It conditionally renders whether the table has a rounded countertop or not.

### TableTops/CounterTops

Because of the complexity of the variations of the countertops, there are 6 different tableTop components.
These are:

- `TabelFlat.jsx` : a straight finished countertop for the table
- `TableFlatRounded.jsx` : a rounded finished countertop for the table
- `TableTop.jsx` : a straight countertop for the cooktop
- `TableTopRound.jsx` : a rounded countertop for the cooktop
- `TableTopCutOut.jsx`: a straight countertop for the sink
- `TableTopCutRound.jsx`: a rounded countertop for the sink

They are conditionally rendered in the `<Sink/>`, `<Cooktop/>` and `<Table/>` components based on the state of the `tableTopRounded` boolean in the Zustand store.

!important notice. If the countertop material is Inox, then the sink is welded onto the countertop. This is done by condiionally rendering another variant of the Reginox sink. This code can be found in the `<Reginox/>` component inside `ReginoxBowl.jsx`.

### Accesoires

The modules have accessories that are conditionally rendered based on their states in the Zustand store. These accessories are:

- `Drawers.jsx` : the main drawers that can be selected for the `sink` and `cooktop` modules
- `ElectricStove.jsx` : the electric stove that can be selected for the `cooktop` module
- `GasStove.jsx` : the gas stove that can be selected for the `cooktop` module
- `ReginoxBowl.jsx` : the sink that can be selected for the `sink` module
- `Stool.jsx` : the stool that can be toggled to accompany the `table` module
- `Tap1.jsx` : the first faucet that can be selected for the `sink` module
- `Tap2.jsx` : the second faucet that can be selected for the `sink` module
- `WineStand.jsx` : the wine stand that accompanies the `tower` module, it has different sizes which can be selected in the UI. In code it reacts to the value of `WineStandSize` in the Zustand store.
- `Alcohol.jsx` : a component that has a few different alcohol bottles for aesthetic purposes.

## Lighting Shadows & Environment

### Env

The environment map is loaded in `Env.jsx`. It uses `<Environment/>` and `<Lightformer/>` components from drei to create the environment map. The environment map is loaded in the `<Experience/>` component in `Experience.jsx`.

### Lights

In the `<Lights/>` component, the lights are loaded. There is one directional light in the scene. In this component are also the soft shadows loaded. The soft shadows are created by using the `<SoftShadows/>` hook from drei.

### ShadowPlanes

The shadow planes are used to create the shadows of the modules. The shadow planes are loaded in the `<BaseIsland/>` component, and thus reused in the `<Sink/>`, `<Cooktop/>` and `<Table/>` components. The large shadow plane is loaded in the `<Tower/>` module.

# UI

## ConfigUI

The `ConfigUI.jsx` file is where the UI is loaded. It includes various UI pages, a tooltip (with handler), a set of extra buttons, and the navigaiton of the UI.

### UI pages

There are various UI pages. These are:

- `ModuleSelectionPage.jsx` : the page where the user can select which module they want to configure

- `UiPage1.jsx` : the first page after selecting a module, where the user can choose all possible materials

- `UiPage2.jsx` : the second page after selecting a module, where the user can choose various options, like:

  - if the countertop is inset or overlayed

  - the finish of the countertop

  - the thickness of the countertop

  - which faucet type the sink has

  - which stove type the cooktop has

  - the size of the winestand

  - the appliance of the tower, options are a wine cooler, a fridge or an oven

  - whether the main drawers are in the modules or not

- `OrderOverview.jsx` : the last page of the UI. Here the user can see an overview of the configuration they made. They can also download a PDF of the configuration.

### UI components

To be able to reuse as much as possible, the components are called in the pages and are given props to alter their content. Some components have such a specific use case that they're not reused but a variation of an existing component.

On the orderOverview page `<ButtonCategoryTitle></ButtonCategoryTitle>` is used. This comes from `TextComponents.jsx` and is a simplified way to create a title for a category and apply a hr below it.

### PDF

THe PDF is created with [react-pdf](https://react-pdf.org/). The PDF is initialized and created in the `PDFButton.jsx` file, on the moment that it is renderd (when landing on the orderOverveiw page). It first waits on the usCapture hook to finish taking an image of the 3D scene of the current configuration. Then it creates the PDF with the image and the configuration details.

The layout of the PDF and the styling, togheter with the handling of props, is done in the `PDF.jsx` file.

# Helpers

## NewMaterial

This is a self written component that creates a new material based on the parameters passed to it. It is used to create the materials for every kitchen module or appliance that needs to take over a kitchen module material.

Parameters are:

- `ambientOcclusion`: string (path to the ambient occlusion texture)
- `type`: string (which type of module it is, or of which module it should have the same material)
- `ralExclude`: boolean (if the material should be excluded of getting a RAL color)
- `envIntensity`: number (the intensity of the environment map)

### useTexture

A custom texture loader written by Aaron. It is used instead of the useTexture from drei because this custom textureloader allows for waiting until the textures are loaded before they're applied to the material.

## useCapture

A custom hook written by Aaron that captures an image of the 3D scene.

It is used in the `PDFBUtton.jsx` file. When the page with the button is loaded, it will take a capture of the current configuration and store it as a base64 string. This string is then passed as a prop to the PDF component which builds the PDF with this image.

# Stores

Stores are called in each file that needs values from given store. This is to avoid rerenders.

## useConfigStore

This store includes all the states that are used for the visualisation and configuring of the kitchen modules.

## useScene

This store includes all the states that are used for the 3D scene, like: the camera position, the camera focus, if there's being hovered over a kitchen module, etc.

Currently only `cameraFocus` is actively used.

## useUIStore

This store includes all the states that are used for the UI, like: which page is currently active, if a details in the UI is open or closed, the content of the tooltip, etc.

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
