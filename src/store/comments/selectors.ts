import { RootState } from '../store';

export const selectCommentsOfPrayer = (state: RootState) => {
  const id = state.prayers.activePrayerId;
  return state.comments.comments.filter(item => item.prayerId === id);
};
