# Media provenance and detection claims

Research and processing date: **30 October 2026**. All clips below are original footage downloaded from the named Pexels source, used under the [Pexels License](https://www.pexels.com/license/), which permits free commercial use subject to its restrictions. The footage is stock footage, not Visolution customer footage, and the people and locations do not endorse Visolution. Pexels attribution is not required, but credits are provided here.

| Website asset | Creator and original source | Source license | Preparation and status |
| --- | --- | --- | --- |
| `public/demo/warehouse-operations.mp4` | Thanh Văn, [People Working with Parcels](https://www.pexels.com/video/people-working-with-parcels-10472376/) | Pexels License | Original 1080p source; 5.04 seconds, resized to 1280×720, 25 fps, H.264, audio removed, faststart; WebP poster at 0.24 seconds. |
| `public/demo/forklift-safety.mp4` | Usman AbdulrasheedGambo, [Warehouse Operations with Forklift and Workers](https://www.pexels.com/video/warehouse-operations-with-forklift-and-workers-32243654/) | Pexels License | Original 4K source; 12 seconds, resized/padded to 1280×720, 25 fps, H.264, audio removed, faststart; WebP poster at 0 seconds. |
| `public/demo/factory-ppe.mp4` | Usman AbdulrasheedGambo, [Industrial Factory Workers Operating Machinery](https://www.pexels.com/video/industrial-factory-workers-operating-machinery-32243444/) | Pexels License | Original 4K source; first 15 seconds, resized/padded to 1280×720, 25 fps, H.264, audio removed, faststart; WebP poster at 0 seconds. |

`scripts/prepare-demo-assets.py` reproducibly downloads and processes only the reviewed sources. It requires `curl` and an ffmpeg build with libx264 and libwebp. Captions in `public/demo/*.vtt` are authored descriptions, not source subtitles. Captions and the video labels identify recorded footage and illustrative cues.

## What is real and what is illustrative

The warehouse footage is real prerecorded Pexels stock video. The displayed warehouse boxes are **real offline model predictions** produced by the Apache-2.0 [Grounding DINO Tiny ONNX model](https://huggingface.co/onnx-community/grounding-dino-tiny-ONNX), using the quantized model and Transformers.js 3.8.1 on CPU. The prompts were “a cardboard box. a wheeled cart.” and “person.”; thresholds are 0.23 and 0.30 respectively. Two frames were sampled per second at actual source times 0.24, 0.72, 1.24, 1.72, 2.24, 2.72, 3.24, 3.72, 4.24 and 4.72 seconds. The UI holds each sampled frame’s predictions until the next sample; it does not assert frame-by-frame inference. No additional boxes were invented. NMS and a same-class greedy IoU association assign estimated IDs, which can change or swap after occlusion. Model output and timestamps are preserved in `src/data/warehouse-detections.json`; `scripts/generate-warehouse-detections.mjs` reproduces inference. The scores are raw, uncalibrated model scores, not verified accuracy. A prediction can encompass multiple parcels, miss objects or be incorrect. The displayed number is the number of predicted parcel regions in the current sample, not a verified count of individual parcels or line-crossing count. No damage, discrepancy, incident, or production evidence is claimed.

The forklift and PPE previews use **hand-authored illustrative overlays and scripted events**, not task-specific model outputs. The forklift cue does not measure distance or assert dangerous proximity; the factory footage shows workers with visible protective equipment and does not assert a violation. An optional COCO-SSD person model can be run in the browser on those two clips; its predictions only classify people and do not produce safety events. No task-specific pretrained PPE, forklift or drawer model was validated on these clips, and no annotated MP4 was exported. A production pilot requires appropriately licensed task-specific models, calibration, suitable footage and independent evaluation.

## Concept-only scenarios

Blocked exit, cash drawer after hours and medical waste are conceptual cards. They do not display a video or claim a detected incident: footage showing the relevant visible conditions and rights/validation were not established in the supplied material. Drawer state may require a sensor and POS context. Healthcare must avoid sensitive clinical settings.

## References reviewed; not reused as Visolution assets

- [Roboflow video analytics article](https://roboflow.com/blog/video-analytics-with-vision-ai) and [Ultralytics object-counting guide](https://docs.ultralytics.com/guides/object-counting/) were reviewed as design/technical references. Ultralytics licensing/weights must be reviewed separately before commercial use.
- [Warehouse box counter GitHub project](https://github.com/MANASA-NUKALA/warehouse-box-counter-cv) did not clearly establish rights for the MP4; the video was not downloaded or reused.
- [Cash-drawer project](https://github.com/darshil2032007/theft-detection-system) describes itself as academic/demonstration use; its assets and weights were not reused.
- [PPE safety detection project](https://github.com/Abdelrahman-cs19/ppe-safety-detection) declares an MIT repository license, but its README says trained weights are git-ignored and separately trained. That does not establish rights or validation for its models and footage. Nothing from it was reused.
- [AI Crafters demos](https://aicraftware.com/demos) was unavailable when checked (HTTP 503); its footage was not reused.
- [NVIDIA PhysicalAI-SmartSpaces](https://huggingface.co/datasets/nvidia/PhysicalAI-SmartSpaces) identifies the dataset as CC BY 4.0. No dataset clips were downloaded or reused; any future use must confirm file-level terms, credit, modifications and third-party rights.
- The user-suggested [forklift clip](https://www.pexels.com/video/forklift-in-a-warehouse-6194507/) is Pexels-licensed, but a different Pexels clip was chosen because it visibly shows both a forklift and a pedestrian.

The referenced upgrade-kit `SOURCES_AND_LICENSES.md` and screenshot files were not present in the supplied attachment directory; the pasted prompt and source URLs were checked directly. Existing still-image sources are documented in [IMAGE_CREDITS.md](IMAGE_CREDITS.md).

## Higgsfield reference

The user-provided [Higgsfield X post](https://x.com/higgsfield_ai/status/2097002211607982463) and its [mirror](https://robot.agientry.com/en/robotvideos/twitter-higgsfield_ai-2097002211607982463) were reviewed as references. The X page returned 403 and neither source established a commercial reuse license, so no Higgsfield video, frames, annotations, logos or model outputs were copied. The licensed Pexels clip and independently generated predictions are used instead.
