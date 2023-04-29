export default {
  install(Vue, num) {
    console.log('@@@@install', Vue, num);
    Vue.filter('mySlice', function (val) {
      return val.slice(0, 3) + '....';
    });
  },
};
