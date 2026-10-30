import * as tf from "@tensorflow/tfjs";
import * as coco from "@tensorflow-models/coco-ssd";

let model: coco.ObjectDetection | undefined;
self.onmessage = async (
  event: MessageEvent<
    { type: "init" } | { type: "frame"; bitmap: ImageBitmap }
  >,
) => {
  try {
    if (event.data.type === "init") {
      await tf.setBackend("cpu");
      await tf.ready();
      model = await coco.load({
        base: "lite_mobilenet_v2",
        modelUrl: "/models/coco-ssd/model.json",
      });
      self.postMessage({ type: "ready" });
    } else if (model) {
      const bitmap = event.data.bitmap;
      try {
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) throw new Error("Canvas is unavailable");
        context.drawImage(bitmap, 0, 0);
        const predictions = await model.detect(
          context.getImageData(0, 0, bitmap.width, bitmap.height),
          8,
          0.55,
        );
        self.postMessage({
          type: "result",
          predictions,
          width: bitmap.width,
          height: bitmap.height,
        });
      } finally {
        bitmap.close();
      }
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      message:
        error instanceof Error ? error.message : "Object detection failed",
    });
  }
};
