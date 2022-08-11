import React from "react"

class Main extends React.Component{
    render() {
        return (
            <div className="maindiv">
                <table>
                    <tr>
                        <tr>{this.props.num}</tr>
                        <tr>number2</tr>
                        <tr>number3</tr>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Main