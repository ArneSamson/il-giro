# Il Giro

Kitchen configurator for Studio Rombauts

## important notes

`tableTop` in code is `counterTop` in the UI

### Index

<table>
  <tr>
    <td valign="top">
      <ul>
        <li><a href="#structure">Structure</a></li>
        <ul>
            <li><a href="#appjsx">App.jsx</a></li>
            <ul>
            <li><a href="#canvas-tag">Canvas Tag</a></li>
            </ul>
            <li><a href="#experiencejsx">Experience.jsx</a></li>
            <li><a href="#scenejsx">Scene.jsx</a></li>
        </ul>
        <li><a href="#controls">Controls</a></li>
        <ul>
            <li><a href="#cameracontrols">CameraControls</a></li>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#misc">Misc</a></li>
        <ul>
            <li><a href="#example">Example</a></li>
        </ul>
      </ul>
    </td>
    <td valign="top">
      <ul>
        <li><a href="#extras">Extras</a></li>
        <ul>
          <li><a href="#perf">Perf</a></li>
        </ul>
      </ul>
    </td>

  </tr>
</table>

# structure

### App.jsx

App.jsx is the main entry point for the application. It is where the Canvas, Loader and UI are loaded.

#### Canvas tag

Inside the Canvas tag, the postprocessing effetcs are loaded as `<Effects/>`. The full 3D experience is loaded as `<Experience/>` inside the Canvas tag.

---

### Experience.jsx

Experience.jsx is where the actual 3D scene is loaded, togheter with the camera, lights and environment

---

### Scene.jsx

Scene.jsx is where the 4 possible kitchen modules are conditionally loaded. The modules are: `sink`, `cooktop`, `tower` and `table`.

---

# Extras

#### Perf

Perf is a component that shows the current FPS and ms of the application. It is loaded in the Experience.jsx file.

---
