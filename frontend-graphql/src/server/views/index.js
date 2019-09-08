import newrelic from 'newrelic';

/**
 * @param html
 * @param state
 * @param helmet
 */
// eslint-disable-next-line
const view = ({ html, state, helmet }) => (
  `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charSet="utf-8" />
            ${newrelic.getBrowserTimingHeader()}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#7292BC"> 
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            <link type="text/css" rel="stylesheet" href="/web/css/bundle.css" />
            <script>
                window.__APP_WEB_HOST__ = ${JSON.stringify(process.env.APP_WEB_HOST)};
                window.__NODE_ENV__ = ${JSON.stringify(process.env.NODE_ENV)};
            </script>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>window.__STATE__ = ${JSON.stringify(state)}</script>
            <script> window.__APOLLO_STATE__ = JSON.stringify(client.extract());</script>
            <script type="text/javascript" src="/web/main.bundle.js"></script>
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
  `
);

export default view;

