import Icon from '@/shared/ui/Icon/Icon';

interface AddRateProps {
  rate: number;
}

export const AddRate: React.FC<AddRateProps> = ({ rate = 0 }: AddRateProps) => {
  if (rate >= 5)
    return (
      <>
        <Icon name="star_filled" />
        <Icon name="star_filled" />
        <Icon name="star_filled" />
        <Icon name="star_filled" />
        <Icon name="star_filled" />
      </>
    );
  if (rate === 0)
    return (
      <>
        <Icon name="star_rate" />
        <Icon name="star_rate" />
        <Icon name="star_rate" />
        <Icon name="star_rate" />
        <Icon name="star_rate" />
      </>
    );

  const renderRate: React.ReactNode[] = [];
  const starFull: number = Math.floor(Number(rate));
  let keyCount: number = 0;
  for (let i = 0; i < starFull; i++)
    renderRate.push(<Icon key={keyCount++} name="star_filled" />);
  const starNoFull = 5 - starFull;
  const starOneTwenty = 5 - rate - starNoFull;
  if (starOneTwenty !== 0) {
    renderRate.push(<Icon key={keyCount++} name="star_half" />);
    for (let i = 0; i < starNoFull - 1; i++)
      renderRate.push(<Icon key={keyCount++} name="star_rate" />);
  } else {
    for (let i = 0; i < starNoFull; i++)
      renderRate.push(<Icon key={keyCount++} name="star_rate" />);
  }
  return <>{renderRate}</>;
};
