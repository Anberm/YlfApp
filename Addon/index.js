// let blob = null;
// let mimeCodec = 'video/webm; codecs="vorbis,vp8"';
// let video = document.getElementById("video");
// let mediasource = new MediaSource();
// let sourceBuffer = null;
// let chunks = [];
// let pump = function(){
//     if(chunks[0]){
//         let chunk = chunks[0];
//         delete chunks[0];
//         sourceBuffer.appendBuffer(chunk);
//         chunk = null;
//     }
// };
// mediaSource.addEventListener('sourceopen', function(_){
//     sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
//     sourceBuffer.addEventListener('updateend', () => {
//         if(chunks[0])
//             pump();
//     }, false);
// });
// video.src = URL.createObjectURL(mediaSource);
// video.play();

// let reader = new FileReader();
// reader.onload = function(event) {
//     chunks[chunks.length] = new Uint8Array(event.target.result);
//     pump();
// };
// reader.readAsArrayBuffer(blob);
export default {}