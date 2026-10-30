# Future production architecture — not implemented

```text
Customer site
  Existing CCTV cameras
    → Existing NVR / DVR / supported RTSP streams
    → Visolution Edge Gateway (Raspberry Pi or compatible hardware)
    → Secure outbound connection
Visolution Managed AI Infrastructure
    → GPU inference / computer vision models
    → Event validation + business rules + duplicate reduction
    → Backend event processing
    → Violation database + authorized evidence storage
    → Dashboard / alerts / reports
```

## Gateway responsibility

Manage supported stream connections, select frames/clips, perform lightweight preprocessing where useful, authenticate to the service, monitor health, reconnect and buffer during temporary interruptions where feasible. Do not assume every camera or DVR works. Assess protocol access, codecs, camera position, illumination, stream resolution and network constraints. A Raspberry Pi is not an unlimited decoder: benchmark memory, thermal behavior, CPU, bandwidth and decoding capacity for each supported configuration.

## Managed infrastructure

Receive authorized selected frames/clips, run configured model inference, apply zones and deployment-specific rules, reduce duplicates, generate structured candidate events, retain authorized evidence and initiate notification/reporting workflows. Potential stack: Python, FastAPI, PyTorch, ONNX Runtime, TensorRT, OpenCV, YOLO-family models, Redis, PostgreSQL, Docker, GPU workers and WebSocket/event streaming. These are candidates, not commitments or installed website services.

## Proposed event boundary

An eventual API may return tenant ID, event ID, camera ID, rule/model version, observed time, category, risk level, confidence, review status and authorized evidence references. Confidence is not calibrated accuracy. Specify timestamp/timezone handling, idempotency, deduplication windows and schema versioning before production integration. Keep this behind an adapter rather than replacing the local demo data source with a live call in marketing code.

## Security and privacy requirements

Use encrypted transmission, rotated authenticated gateway credentials, tenant isolation, least-privilege role access, signed/expiring evidence access, audit logs, defined retention and secure deletion. Keep camera credentials out of browser bundles and event payloads. Document customer-approved camera placement, notices, lawful processing basis and employee/patient privacy considerations. Exclude sensitive treatment areas. Obtain jurisdiction-specific review before a pilot.

## Deployment validation

Define a single observable violation and review workflow. Evaluate false alerts, missed events, camera placement, lighting, occlusion and latency under the intended deployment. Measure gateway capacity and recovery behavior, queue backpressure and notification delivery. Set explicit retention/storage budgets. Add multi-tenant boundary tests and restore/delete exercises before broad deployment. Never promise universal detection, unlimited cameras or guaranteed real-time/24-hour availability.

## Planned component names

Visolution Edge: connectivity. Inference: managed analysis. Detect: configured detection rules. Events: records and evidence. Console: dashboard. Alerts: notification workflows. Names describe a proposed system, not separately launched products.
