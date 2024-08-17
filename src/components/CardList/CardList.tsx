import './CardList.scss';
import { useAppSelector } from '../../store/reduxHooks';
import { InputsData } from '../../types';
import Card from '../Card/Card';

export default function CardList() {
  const formsCards = useAppSelector((state) => state.forms.formsCards);

  const renderContent = () => {
    if (formsCards && formsCards.length === 0) {
      return <div key="noData">No Data</div>;
    }

    if (formsCards)
      return formsCards.map((item: InputsData, index: number) => (
        <Card key={`${item.name}-${index}`} inputsData={item} />
      ));
  };

  return <div className="cardList">{renderContent()}</div>;
}
