import classes from './button.module.css';

export default function Button({
  type,
  text,
  onClick,
}) {
  return (
    <div className={classes.button}>
      <button
        className='text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full py-2 mt-2 rounded'
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

Button.defaultProps = {
  type: 'button',
  text: 'Submit',
  backgroundColor: '#8d27ae',
  color: 'white',
  fontSize: '1.3rem',
  width: '10rem',
  height: '3.5rem',
  borderRadius: '0.5rem',
};