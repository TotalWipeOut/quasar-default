import { QBtn, QCard, QChip } from 'quasar';
import { defineBoot } from '#q-app/wrappers';

export default defineBoot(() => {
  QCard.props.bordered = { type: Boolean, default: false }
  QCard.props.flat = { type: Boolean, default: true }
  QBtn.props.flat = { type: Boolean, default: true }
  QBtn.props.bordered = { type: Boolean, default: true }
  QChip.props.iconRemove = { type: String, default: 'fa-solid fa-x' }
});
