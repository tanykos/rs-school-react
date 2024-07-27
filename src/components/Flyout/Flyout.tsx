import './Flyout.scss';

interface FlyoutProps {
  itemCount: number;
}

export default function Flyout({ itemCount }: FlyoutProps) {
  return (
    <div className={`flyout ${itemCount > 0 ? 'visible' : 'hidden'}`}>
      <p>{itemCount} item(s) selected</p>
    </div>
  );
}
