import React, { Component } from "react";

class Query extends Component {


    render() {
        const { name, label, error, readOnly, ...rest } = this.props;
        return (
            <div className="form-group">
                <input
                    name={name}
                    id={name}
                    className={error ? "form-control error" : "form-control"}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    readOnly={readOnly}
                    {...rest}
                />
                <label className="label-placeholder" htmlFor={name}>{label}</label>

                {error && <label className="error">{error}</label>}
            </div>
        );
    }
}

export default Query;
