import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useParams} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button} from 'antd';

export default function Post() {
  const {id} = useParams();

  usePageTitle(`文章详情 - ${id}`);

  const [countdown, setCountdown] = useCountdownTimer(5);

  function handleResetClick() {
    setCountdown(Math.floor(Math.random() * 10 + 1));
  }

  return (
    <Card>
      <h2>文章详情 - {id}</h2>
      <h3>{countdown}</h3>
      <Button onClick={handleResetClick}>Reset</Button>
    </Card>
  );
}

function useCountdownTimer(countdownSeconds: number): [number, Dispatch<SetStateAction<number>>] {
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCountdown(prevCountdown => prevCountdown - 1);
      },
      1000
    );

    if (countdown === 0) {
      window.clearInterval(interval);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [countdown]);

  return [countdown, setCountdown];
}
