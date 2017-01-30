import * as React from 'react';

export class MasterPage extends React.Component<any,any>{
    render(){
        return(
            <html>
                <head>
                    <title><%= title %></title>
                    <link rel="stylesheet" href="/bundle.css" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-with-addons.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/3.0.2/ReactRouter.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.2/react-redux.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.js"></script>
                </head>
                <body>
                    <div className="header">
                        <div className="content">
                            <h1><%= title %></h1>
                        </div>
                    </div>

                    <div className="content" id="app" dangerouslySetInnerHTML={{ __html: this.props.content }} >
                    </div>

                    <script dangerouslySetInnerHTML={{__html: this.props.data}}>

                    </script>
                    <script src="/js/home.js"></script>
                </body>
            </html>            
        )
    }    
}