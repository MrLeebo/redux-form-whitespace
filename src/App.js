import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import toastr from 'toastr'
import { save } from './reducer'
import 'toastr/build/toastr.css'

class App extends Component {
  formSubmit = async values => {
    console.log('Saved!')
    console.log(values)
    await this.props.onSave(Promise.resolve(values))
    toastr.success('Your form has been saved.', 'Success')
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <div style={{padding: 20}}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <p>
            ISSUE: If your form with the "enableReinitialize" prop is backed by an API endpoint that automatically trims whitespace from input fields and you submit a form that only changes the whitespace, the form state does not reset.
          </p>

          <p>
            REPRO:
          </p>
          <ol>
            <li>Type something into a textbox.</li>
            <li>Press Enter. The form should save and the button becomes disabled.</li>
            <li>Add whitespace to the end of a textbox.</li>
            <li>Press Enter. The form still saves, but the button remains enabled.</li>
          </ol>

          <p>
            EXPECTED: After a successful form submit, the form state should become "pristine" with the latest values populated.
          </p>

          <p>
            ACTUAL: The form values do not refresh and the form is in a stale state.
          </p>

          <p>
            EXPLANATION: After the form is saved, the new "initialValues" prop is identical to what it was before. So even though the form has successfully submitted, the form state does not get reset to the pristine state even though the form values do not match the "initialValues".
          </p>

          <div>
            <label>One: <Field name="one" component="input" type="text" /></label>
          </div>

          <div>
            <label>Two: <Field name="two" component="input" type="text" /></label>
          </div>

          <div>
            <label>Three: <Field name="three" component="input" type="text" /></label>
          </div>

          <div>
            <button disabled={pristine || submitting}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    initialValues: state.myReducer
  }
}

const Decorated = reduxForm({ form: 'myForm', enableReinitialize: true })(App)
export default connect(mapStateToProps, { onSave: save })(Decorated);
