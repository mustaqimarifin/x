export interface BlurColor {
  clr: string;
  data: string;
}

export const colorGroup: BlurColor[] = [
  {
    clr: "lime",
    data: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3NjggNDMyJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PC9maWx0ZXI+PGltYWdlIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnIGZpbHRlcj0ndXJsKCNiKScgeD0nMCcgeT0nMCcgaGVpZ2h0PScxMDAlJyB3aWR0aD0nMTAwJScgaHJlZj0nZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFQQUFBT3JxbWYvLy95SDVCQUFBQUFBQUxBQUFBQUFCQUFFQUFBSUNSQUVBT3c9PScvPjwvc3ZnPg==",
  },
  {
    clr: "violet",
    data: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3NjggNDMyJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PC9maWx0ZXI+PGltYWdlIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnIGZpbHRlcj0ndXJsKCNiKScgeD0nMCcgeT0nMCcgaGVpZ2h0PScxMDAlJyB3aWR0aD0nMTAwJScgaHJlZj0nZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFQQUFBRmxabWYvLy95SDVCQUFBQUFBQUxBQUFBQUFCQUFFQUFBSUNSQUVBT3c9PScvPjwvc3ZnPg==",
  },
  {
    clr: "orange",
    data: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3NjggNDMyJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PC9maWx0ZXI+PGltYWdlIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnIGZpbHRlcj0ndXJsKCNiKScgeD0nMCcgeT0nMCcgaGVpZ2h0PScxMDAlJyB3aWR0aD0nMTAwJScgaHJlZj0nZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFQQUFBUC9NbWYvLy95SDVCQUFBQUFBQUxBQUFBQUFCQUFFQUFBSUNSQUVBT3c9PScvPjwvc3ZnPg==",
  },
];

export function randomColor() {
  if (colorGroup.length === 0) {
    console.log(undefined);
  } else {
    const ind: number = Math.floor(Math.random() * colorGroup.length);
    const result = colorGroup[ind].data;
    //.log(`Random Element = ${result}`);
    return result;
  }
}

//.log(randomColor)
