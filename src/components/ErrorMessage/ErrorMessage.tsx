import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return <p className={css.text}>No movies found for your request.</p>;
}
