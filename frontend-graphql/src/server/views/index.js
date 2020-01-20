import newrelic from 'newrelic';
import manifest from '../../../build/asset-manifest';

const mainJs = manifest['main.js'].replace(/\/static/, '');

/**
 * @param html
 * @param state
 * @param helmet
 */
// eslint-disable-next-line
const view = ({ html, state, helmet }) => {
  return (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charSet="utf-8" />
            ${newrelic.getBrowserTimingHeader()}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#7292BC"> 
            <!-- Latest compiled and minified CSS -->
            <link type="text/css" rel="stylesheet" href="/css/main.ffd507db.chunk.css" />
            <script>
                window.__NODE_ENV__ = ${JSON.stringify(process.env.NODE_ENV)};
            </script>
            <script>
                window.__STATE__ = ${JSON.stringify(state)}
            </script>
        </head>
        <body>
            <div id="root">${html}</div>
            <script type="text/javascript" src="/js/2.c8ee481d.chunk.js"></script>
            <script type="text/javascript" src="/js/runtime~main.42ac5946.js"></script>
            <script type="text/javascript" src="${mainJs}"></script>
            <script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                ga('create', '${process.env.GAID}', 'auto');
                ga('send', 'pageview');
            </script>
            <script async src="https://www.google-analytics.com/analytics.js"></script>
        </body>
    </html>
  `)
};

export default view;

