export const populateUserRelationshipOptions = (filed: string) => ({
  path: filed,
  model: 'User',
  select: { _id: 1, userName: 1, avatar: 1 },
});
