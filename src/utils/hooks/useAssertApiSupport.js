export default source => {
  const supportQualitys = useGetter('common', 'supportQualitys')

  return Boolean(supportQualitys[source])
}
