import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

export class MasterPage extends React.Component<any,any>{
    render(){
        return(
            <html>
                <head>
                    <title><%= title %></title>
                    <link rel="stylesheet" href="/bundle.css" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-with-addons.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/4.0.0-0/react-router.js"></script>
                </head>
                <body>
                    <div className="header">
                        <div className="content">
                            <h1><%= title %></h1>
                        </div>
                    </div>

                    <div className="content" id="app" dangerouslySetInnerHTML={{__html: ReactDOM.renderToString(this.props.children) }} >
                    </div>

                    <script dangerouslySetInnerHTML={{__html: this.props.data}}>

                    </script>
                    <script src="/js/home.js"></script>
                </body>
            </html>            
        )
    }    
}