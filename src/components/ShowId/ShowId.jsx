import './ShowId.scss';

const ShowId = (props) => {
    return (
      <div className={`show-id ${props.show}`}>
          <p>{props.children}</p>
      </div>
    );
}

export default ShowId
