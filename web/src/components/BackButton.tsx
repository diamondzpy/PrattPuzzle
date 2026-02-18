import { useNavigate } from "react-router-dom";

type Props = {
  fallbackTo?: string;
  useHistory?: boolean;
};

export function BackButton({ fallbackTo = "/", useHistory = true }: Props) {
  const navigate = useNavigate();

  function goBack() {
    if (useHistory && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(fallbackTo);
  }

  return (
    <button className="back-button" type="button" onClick={goBack}>
      <span aria-hidden>🚪</span>
      <span>Back</span>
    </button>
  );
}
