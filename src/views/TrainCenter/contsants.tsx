export const FilterByOptions = [
  { label: 'All', value: 'all' },
  { label: 'All Campaigns', value: 'campaign' },
  { label: 'Organization', value: 'organization' },
];

export const UploadFileModalReflectionTypeOptions = [
  {
    description:
      'Your uploaded content will reflect across all of your campaigns. Simulacrum AI will consider it globally.',
    label: 'Organization',
    value: 'organization',
  },
  {
    description:
      'Your uploaded content will reflect in the campaigns you choose. Simulacrum AI will only apply it to selected campaigns.',
    label: 'Campaign',
    value: 'campaign',
  },
];
