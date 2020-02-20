import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertDismissible extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    if (this.props.showAlert) {
      return (
        <Alert variant="danger" onClose={() => this.props.setShow()} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
        </p>
        </Alert>
      );
    }
    else {
      return <Button onClick={() => this.props.setShow()}>Show Alert</Button>;
    }
    //return <div></div>
  }
}

export default AlertDismissible;
