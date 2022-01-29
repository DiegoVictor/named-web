import React, { useCallback, useMemo, useState } from "react";
import {
  BsFillEmojiFrownFill,
  BsFillEmojiLaughingFill,
  BsFillEmojiNeutralFill,
} from "react-icons/bs";

import { Container } from "./styles";

function Name({ value, onFeedback }) {
  const capitalize = useCallback(
    (text) => [text[0].toUpperCase(), text.slice(1)].join(""),
    []
  );

  const [feedback, setFeedback] = useState(0);

  const iconMap = useMemo(
    () => ({
      "-1": BsFillEmojiFrownFill,
      0: BsFillEmojiNeutralFill,
      1: BsFillEmojiLaughingFill,
    }),
    []
  );

  const getFeedbackIcon = useCallback(() => {
    const Icon = iconMap[feedback];
    return <Icon />;
  }, [feedback, iconMap]);

  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          let newValue = feedback + 1;
          if (newValue > 1) {
            newValue = -1;
          }
          setFeedback(newValue);
          onFeedback(newValue);
        }}
        data-testid={`name-${value.replace(/\s/gi, "")}`}
      >
        {getFeedbackIcon(value)}
        <span>
          {value
            .split(" ")
            .map((string) => capitalize(string))
            .join(" ")}
        </span>
      </button>
    </Container>
  );
}

export default Name;
