require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

const omniImport = resolve => resolve.keys().forEach(resolve);

omniImport( require.context('../src/', true, /\.js$|\.scss$/) );