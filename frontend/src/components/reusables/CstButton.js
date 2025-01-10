const Cstbutton = ({ text, onClick, className, icon }) => {
    return (
      <button
        type="submit"
        className={className}
        onClick={onClick}
        icon={icon}
      >
        {text}
      </button>
    );
  };


  export default Cstbutton;