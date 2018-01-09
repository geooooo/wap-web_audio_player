// Native JS
//
// window.onload = function () {
//     console.log("Go !");
// };
//
//
// function start() {
//     var a = [
//         'equalizer__level_animate-func-ease',
//         'equalizer__level_animate-func-ease-out',
//         'equalizer__level_animate-func-ease-in',
//         'equalizer__level_animate-func-ease-in-out',
//         'equalizer__level_animate-func-linear'
//     ];
//     var b = [
//         'equalizer__level_animate-duration-slow',
//         'equalizer__level_animate-duration-normal',
//         'equalizer__level_animate-duration-fast'
//     ];
//     console.log('START');
//     var equalizer_levels = document.getElementsByClassName('equalizer__level');
//     for (var i = 0; i < equalizer_levels.length; ++i) {
//         equalizer_levels[i].setAttribute('class', 'equalizer__level equalizer__level_animated');
//         var n = Math.trunc(Math.random() * a.length);
//         equalizer_levels[i].classList.add(a[n]);
//         var n = Math.trunc(Math.random() * b.length);
//         equalizer_levels[i].classList.add(b[n]);
//         equalizer_levels[i].classList.add('equalizer__level_animate-started');
//     }
// }
//
//
// function stop() {
//     console.log('STOP');
//     var equalizer_levels = document.getElementsByClassName('equalizer__level');
//     for (var i = 0; i < equalizer_levels.length; ++i) {
//         equalizer_levels[i].classList.remove('equalizer__level_animate_started');
//         equalizer_levels[i].classList.add('equalizer__level_animate_stoped');
//     }
// }
//
//
// function pause() {
//     console.log('PAUSE');
//     var equalizer_levels = document.getElementsByClassName('equalizer__level');
//     for (var i = 0; i < equalizer_levels.length; ++i) {
//         equalizer_levels[i].classList.add('equalizer__level_animate-paused');
//     }
// }
//
//
// function resume() {
//     console.log('RESUME');
//     var equalizer_levels = document.getElementsByClassName('equalizer__level');
//     for (var i = 0; i < equalizer_levels.length; ++i) {
//         equalizer_levels[i].classList.remove('equalizer__level_animate-paused');
//     }
// }
