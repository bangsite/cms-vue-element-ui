<template>
  <div class="editor-wrapper">
    <div class="canvas_wrapper" ref="wrapperRef">
      <canvas id="canvas" width="750" height="750" style="border: 1px solid #ccc"></canvas>
    </div>
    <input
      type="color"
      name=""
      id=""
      v-model="currentColor"
      @input="($event) => handleChangeColor($event.target.value)"
    />
    <button @click="handleChangeBackground">Change Background</button>
    <button @click="addTextBox">addTextBox</button>
  </div>
</template>

<script lang="ts" setup>
import { fabric } from "fabric";
import { onMounted, ref } from "vue";

let canvas: fabric.Canvas;
const wrapperRef = ref<HTMLDivElement | null>(null);
const currentColor = ref("#ffff");
const scale = 0.75;
const img = document.createElement("img");
img.src = "/assets/icons/icon_delete.png";

const handleChangeColor = (color: string) => {
  if (canvas && canvas.backgroundImage && canvas.backgroundImage instanceof fabric.Image) {
    canvas.backgroundImage?.filters?.forEach((filter) => {
      if (filter instanceof fabric.Image.filters.BlendColor) {
        filter.color = color;
      }
    });
    canvas.backgroundImage.applyFilters();
    canvas.requestRenderAll();
  }
};
const setBackground = (url: string, _canvas: fabric.Canvas) => {
  const filters = fabric.Image.filters;
  const filter = new filters.BlendColor({
    color: currentColor.value,
    mode: "multiply",
  });
  fabric.Image.fromURL(url, (img) => {
    if (img) {
      img.center();
      img.scale(scale);
      img.filters?.push(filter);
      img.applyFilters();
      const h: number = img.getScaledHeight();
      const w: number = img.getScaledWidth();
      _canvas.setHeight(h);
      _canvas.setWidth(w);
      _canvas.setBackgroundImage(img, () => {});
    }
  });
};
// Adding a textbox to the canvas.
const addTextBox = () => {
  if (canvas) {
    const rect = new fabric.Textbox("asdasdasd", {
      left: 150,
      top: 150,
      fill: "red",
      width: 200,
      height: 100,
      objectCaching: false,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
  }
};
// Adding a rectangle to the canvas and setting it as a clipPath for all the objects added to the canvas.
interface IClipPath {
  width: number;
  height: number;
  top: number;
  left: number;
}
const addClipPath = ({ width, height, top, left }: IClipPath) => {
  if (canvas) {
    const clipPath = new fabric.Rect({
      width: width,
      height: height,
      hasBorders: true,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      absolutePositioned: true,
      top: top,
      left: left,
      evented: false,
      padding: 10,
      selectable: false,
      strokeDashArray: [10, 10, 10, 10],
      stroke: "gray",
      strokeWidth: 2,
      fill: "gray",
      opacity: 0.1,
      transparentCorners: false,
      dirty: true,
    });

    canvas.add(clipPath);
    canvas.on("object:added", (e) => {
      if (e.target && e.target.type !== "rect" && e.target.type !== "group") {
        const objects = canvas.getObjects();
        const rectObjects = objects.filter((obj) => obj.type === "rect");
        const map = rectObjects.map((zone) => {
          const clone = fabric.util.object.clone(zone);
          clone.set({
            fill: "gray",
            padding: 10,
            opacity: 0.1,
            selectable: false,
            top: zone.top,
            left: zone.left,
            hasBorders: true,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            absolutePositioned: true,
            transparentCorners: true,
          });
          return clone;
        });
        // TODO - add multiple clipPath
        const clipPathGroup =
          map.length > 1
            ? new fabric.Group(map, {
                selectable: false,
                hasBorders: false,
                inverted: true,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
              })
            : null;
        console.log(clipPathGroup);
        map.length > 1 && rectObjects.forEach((obj) => canvas.remove(obj));

        clipPathGroup && canvas.add(clipPathGroup);
        // reset clipPath
        e.target.clipPath = clipPathGroup || clipPath;
        //   set e.target on top
        canvas.bringToFront(e.target);
      }
    });
    canvas.requestRenderAll();
  }
};

const handleChangeBackground = () => {
  if (canvas) {
    setBackground("/assets/images/shirt-1.png", canvas);
  }
};

// A function that is called when the delete icon is clicked. It removes the object from the canvas.
const deleteObject = (eventData: any, transform: any) => {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
  return true;
};
const renderIcon = (ctx: CanvasRenderingContext2D, left: number, top: number) => {
  const size = 18;
  ctx.save();
  ctx.translate(left, top);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
};

onMounted(() => {
  const _canvas = new fabric.Canvas("canvas", {
    width: 750,
    height: 750,
    backgroundColor: "#ffffff",
    renderOnAddRemove: true,
  });
  canvas = _canvas;
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
  });
  fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
    x: -0.5,
    y: -1,
    offsetY: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon,
  });
  canvas.controlsAboveOverlay = true;

  setBackground("/assets/images/coat-1.png", _canvas);
  addClipPath({
    width: 200,
    height: 500,
    top: 100,
    left: 130,
  });
  // addClipPath({
  //   width: 200,
  //   height: 500,
  //   top: 100,
  //   left: 350,
  // });
  // addClipPath({
  //   width: 200,
  //   height: 500,
  //   top: 100,
  //   left: 500,
  // });
  addTextBox();
});
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.canvas_wrapper {
  position: relative;
}
</style>
