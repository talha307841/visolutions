export const cameras = [
  {
    name: "Warehouse overview",
    location: "Sample · Warehouse stock footage",
    video: "/videos/warehouse.mp4",
    poster: "/images/warehouse.jpg",
    type: "EXIT",
    confidence: 96,
  },
  {
    name: "Warehouse inventory",
    location: "Sample · Warehouse stock footage",
    video: "/videos/warehouse.mp4",
    poster: "/images/warehouse.jpg",
    type: "PPE",
    confidence: 91,
  },
  {
    name: "Logistics aisle",
    location: "Sample · Logistics stock footage",
    video: "/videos/logistics.mp4",
    poster: "/images/warehouse.jpg",
    type: "PROXIMITY",
    confidence: 88,
  },
  {
    name: "Healthcare corridor",
    location: "Sample · Healthcare stock footage",
    video: "/videos/healthcare.mp4",
    poster: "/images/healthcare.jpg",
    type: "WASTE",
    confidence: 89,
  },
];
export const sampleEvents = [
  {
    title: "Emergency Exit Obstructed",
    category: "Access",
    severity: "Critical",
    camera: 0,
    time: "10:42:08",
  },
  {
    title: "PPE Not Detected",
    category: "PPE",
    severity: "Warning",
    camera: 1,
    time: "10:41:32",
  },
  {
    title: "Forklift Proximity Warning",
    category: "Vehicle",
    severity: "Warning",
    camera: 2,
    time: "10:40:16",
  },
  {
    title: "Waste Handling Review Required",
    category: "Waste",
    severity: "Review",
    camera: 3,
    time: "10:38:54",
  },
  {
    title: "Restricted Area Entry",
    category: "Access",
    severity: "Critical",
    camera: 0,
    time: "10:37:20",
  },
];
export type DemoEvent = (typeof sampleEvents)[number] & {
  id: number;
  acknowledged: boolean;
};
export function initialEvents(): DemoEvent[] {
  return sampleEvents
    .slice(0, 4)
    .map((event, id) => ({ ...event, id, acknowledged: false }));
}
