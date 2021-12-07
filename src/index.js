const omniImport = resolve => resolve.keys().forEach(resolve);

omniImport( require.context('../src/', true, /\.js$|\.scss$/) );
