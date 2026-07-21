import upload001 from "./upload-001.png.asset.json";
import upload002 from "./upload-002.png.asset.json";
import upload003 from "./upload-003.png.asset.json";
import upload004 from "./upload-004.png.asset.json";
import upload005 from "./upload-005.png.asset.json";
import upload006 from "./upload-006.png.asset.json";
import upload007 from "./upload-007.png.asset.json";
import upload008 from "./upload-008.png.asset.json";
import upload009 from "./upload-009.png.asset.json";
import upload010 from "./upload-010.png.asset.json";
import upload011 from "./upload-011.png.asset.json";
import upload012 from "./upload-012.png.asset.json";
import upload013 from "./upload-013.png.asset.json";
import upload014 from "./upload-014.png.asset.json";
import upload015 from "./upload-015.png.asset.json";
import upload016 from "./upload-016.png.asset.json";
import upload017 from "./upload-017.png.asset.json";
import upload018 from "./upload-018.png.asset.json";
import upload019 from "./upload-019.png.asset.json";
import upload020 from "./upload-020.png.asset.json";
import upload051 from "./upload-051.png.asset.json";
import upload052 from "./upload-052.png.asset.json";
import upload053 from "./upload-053.png.asset.json";
import upload054 from "./upload-054.png.asset.json";
import upload055 from "./upload-055.png.asset.json";
import upload056 from "./upload-056.png.asset.json";

export const uploadedPhotos = [
  { id: "upload-001", filename: "1.png", asset: upload001, url: upload001.url },
  { id: "upload-002", filename: "2.png", asset: upload002, url: upload002.url },
  { id: "upload-003", filename: "3.png", asset: upload003, url: upload003.url },
  { id: "upload-004", filename: "4.png", asset: upload004, url: upload004.url },
  { id: "upload-005", filename: "5.png", asset: upload005, url: upload005.url },
  { id: "upload-006", filename: "6.png", asset: upload006, url: upload006.url },
  { id: "upload-007", filename: "7.png", asset: upload007, url: upload007.url },
  { id: "upload-008", filename: "8.png", asset: upload008, url: upload008.url },
  { id: "upload-009", filename: "9.png", asset: upload009, url: upload009.url },
  { id: "upload-010", filename: "10.png", asset: upload010, url: upload010.url },
  { id: "upload-011", filename: "11.png", asset: upload011, url: upload011.url },
  { id: "upload-012", filename: "12.png", asset: upload012, url: upload012.url },
  { id: "upload-013", filename: "13.png", asset: upload013, url: upload013.url },
  { id: "upload-014", filename: "14.png", asset: upload014, url: upload014.url },
  { id: "upload-015", filename: "15.png", asset: upload015, url: upload015.url },
  { id: "upload-016", filename: "16.png", asset: upload016, url: upload016.url },
  { id: "upload-017", filename: "17.png", asset: upload017, url: upload017.url },
  { id: "upload-018", filename: "18.png", asset: upload018, url: upload018.url },
  { id: "upload-019", filename: "19.png", asset: upload019, url: upload019.url },
  { id: "upload-020", filename: "20.png", asset: upload020, url: upload020.url },
  { id: "upload-051", filename: "51.png", asset: upload051, url: upload051.url },
  { id: "upload-052", filename: "52.png", asset: upload052, url: upload052.url },
  { id: "upload-053", filename: "53.png", asset: upload053, url: upload053.url },
  { id: "upload-054", filename: "54.png", asset: upload054, url: upload054.url },
  { id: "upload-055", filename: "55.png", asset: upload055, url: upload055.url },
  { id: "upload-056", filename: "56.png", asset: upload056, url: upload056.url },
] as const;

export type UploadedPhoto = (typeof uploadedPhotos)[number];