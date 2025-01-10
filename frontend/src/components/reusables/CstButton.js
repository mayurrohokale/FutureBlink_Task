const Cstbutton = ({ text, onClick, className }) => {
    return (
      <button
        type="submit"
        className={className}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };


  export default Cstbutton;