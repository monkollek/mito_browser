//import { UserVisibleError } from '../../errors'
//import { fetchGnomadMNVSummariesByVariantId } from './gnomadMultiNucleotideVariants'

/*
const formatHistogram = histogramData => ({
  bin_edges: histogramData.bin_edges.split('|').map(s => Number(s)),
  bin_freq: histogramData.bin_freq.split('|').map(s => Number(s)),
  n_larger: histogramData.n_larger,
  n_smaller: histogramData.n_smaller,
})

*/

//const POPULATIONS = ['afr', 'amr', 'asj', 'eas', 'fin', 'nfe', 'oth', 'sas']
const POPULATIONS = ['afr', 'amr', 'eas', 'eur', 'oth', 'sas']

const HAPLOTYPES = ["A","B","C","D","E","F","G","H","H+","H1","H2","H3","H4","H5","H6","H7","H8","H9","HV","I","J","K","L0","L1",
        "L2","L3","L4","M","N","P","R","T","U","V","W","X","Y","Z"]


/*
const SUBPOPULATIONS = {
  afr: ['female', 'male'],
  amr: ['female', 'male'],
  asj: ['female', 'male'],
  eas: ['female', 'male', 'jpn', 'kor', 'oea'],
  fin: ['female', 'male'],
  nfe: ['female', 'male', 'bgr', 'est', 'nwe', 'onf', 'seu', 'swe'],
  oth: ['female', 'male'],
  sas: ['female', 'male'],
}
*/

const formatPopulations = variantData =>
  POPULATIONS.map(popId => ({
    id: popId.toUpperCase(),
    ac: variantData.AC_adj[popId] || 0,
    an: variantData.AN_adj[popId] || 0,
    ac_hom: variantData.nhomalt_adj[popId] || 0,

    //ac: (variantData.AC_adj[popId] || {}).total || 0,
    //an: (variantData.AN_adj[popId] || {}).total || 0,
    //ac_hemi: variantData.nonpar ? (variantData.AC_adj[popId] || {}).male || 0 : 0,
    //ac_hom: (variantData.nhomalt_adj[popId] || {}).total || 0,

    /*
    subpopulations: SUBPOPULATIONS[popId].map(subPopId => ({
      id: subPopId.toUpperCase(),
      ac: (variantData.AC_adj[popId] || {})[subPopId] || 0,
      an: (variantData.AN_adj[popId] || {})[subPopId] || 0,
      ac_hom: (variantData.nhomalt_adj[popId] || {})[subPopId] || 0,
    })),*/

  }))


const formatHaplotypes = variantData =>
  HAPLOTYPES.map(hapId => ({
    id: hapId.toUpperCase(),
    ac: variantData.AC_hap[hapId] || 0,
    an: variantData.AN_hap[hapId] || 0,
    //ac_hom: variantData.nhomalt_adj[popId] || 0,

    //ac: (variantData.AC_adj[popId] || {}).total || 0,
    //an: (variantData.AN_adj[popId] || {}).total || 0,
    //ac_hemi: variantData.nonpar ? (variantData.AC_adj[popId] || {}).male || 0 : 0,
    //ac_hom: (variantData.nhomalt_adj[popId] || {}).total || 0,

    /*
    subpopulations: SUBPOPULATIONS[popId].map(subPopId => ({
      id: subPopId.toUpperCase(),
      ac: (variantData.AC_adj[popId] || {})[subPopId] || 0,
      an: (variantData.AN_adj[popId] || {})[subPopId] || 0,
      ac_hom: (variantData.nhomalt_adj[popId] || {})[subPopId] || 0,
    })),*/

  }))



/*
const formatFilteringAlleleFrequency = (variantData, fafField) => {
  const fafData = variantData[fafField]
  const { total, ...populationFAFs } = variantData[fafField]

  let popmaxFAF = -Infinity
  let popmaxPopulation = null

  Object.keys(populationFAFs)
    // gnomAD 2.1.0 calculated FAF for singleton variants.
    // This filters out those invalid FAFs.
    .filter(popId => variantData.AC_adj[popId].total > 1)
    .forEach(popId => {
      if (populationFAFs[popId] > popmaxFAF) {
        popmaxFAF = fafData[popId]
        popmaxPopulation = popId.toUpperCase()
      }
    })

  if (popmaxFAF === -Infinity) {
    popmaxFAF = null
  }

  return {
    popmax: popmaxFAF,
    popmax_population: popmaxPopulation,
  }
}
*/

const fetchVariantData = async (ctx, variantId) => {

/*
  const requests = [
    { index: 'gnomad_exomes_2_1_1', subset },
    // All genome samples are non_cancer, so separate non-cancer numbers are not stored
    { index: 'gnomad_genomes_2_1_1', subset: subset === 'non_cancer' ? 'gnomad' : subset },
  ]
*/

/*
  const [exomeData, genomeData] = await Promise.all(
    requests.map(({ index, subset: requestSubset }) =>
      ctx.database.elastic
        .search({
          index,
          type: 'variant',
          _source: [
            requestSubset,
            'ab_hist_alt',
            'allele_info',
            'alt',
            'chrom',
            'dp_hist_all',
            'dp_hist_alt',
            'filters',
            'flags',
            'gnomad_age_hist_het',
            'gnomad_age_hist_hom',
            'gq_hist_all',
            'gq_hist_alt',
            'nonpar',
            'pab_max',
            'pos',
            'qual',
            'ref',
            'rf_tp_probability',
            'rsid',
            'sortedTranscriptConsequences',
            'variant_id',
            'xpos',
          ],
          body: {
            query: {
              bool: {
                filter: [
                  { term: { variant_id: variantId } },
                  { range: { [`${requestSubset}.AC_raw`]: { gt: 0 } } },
                ],
              },
            },
          },
          size: 1,
        })
        .then(response => response.hits.hits[0])
        // eslint-disable-next-line no-underscore-dangle
        .then(doc => (doc ? { ...doc._source, ...doc._source[requestSubset] } : undefined))
    )
  )
  */


  /*
  return {
    exomeData,
    genomeData,
  }
  */

  //console.log("In here 2")

  const exomeData = await ctx.database.elastic.search({
  //await ctx.database.elastic.search({
    index: 'gnomad_mt',
    type: 'variant',
    _source: [
//      requestSubset,
//      'ab_hist_alt',
//      'allele_info',
      'alt',
      'chrom',
//      'dp_hist_all',
//      'dp_hist_alt',
      'filters',
//      'flags',
//      'gnomad_age_hist_het',
//      'gnomad_age_hist_hom',
//      'gq_hist_all',
//      'gq_hist_alt',
//      'nonpar',
//      'pab_max',
      'pos',
//      'qual',
      'ref',
//      'rf_tp_probability',
//      'rsid',
      'sortedTranscriptConsequences',
      'variant_id',
      'xpos',
      'AC_hap',
      'AN_hap',
      'ac',
      'an'

    ],
    body: {
      query: {
        bool: {
          filter: [
            { term: { variant_id: variantId } },
            //{ range: { [`${requestSubset}.AC_raw`]: { gt: 0 } } },
          ],
        },
      },
    },
    size: 1,
  })
  //.then(function (response){
    //console.log("In here 3") 
    //console.log(response.hits.hits[0]._source)
    //return response.hits.hits[0]._source

  //})
  //.then(response => console.log(response.hits.hits[0]))
  //.then(response => return response.hits.hits[0])
  //.then(doc => (doc ? { ...doc._source } : undefined))
  //.then(response => response.hits.hits[0])

  //console.log(exomeData)

  //return esHit => {
  //  return esHit.hits.hits[0]
  //}
  //console.log("In here 3.1") 
  console.log(exomeData.hits.hits[0]._source) 


  return exomeData.hits.hits[0]._source
}

/*
const fetchColocatedVariants = async (ctx, variantId, subset) => {
  const parts = variantId.split('-')
  const chrom = parts[0]
  const pos = Number(parts[1])

  const requests = [
    { index: 'gnomad_exomes_2_1_1', subset },
    // All genome samples are non_cancer, so separate non-cancer numbers are not stored
    { index: 'gnomad_genomes_2_1_1', subset: subset === 'non_cancer' ? 'gnomad' : subset },
  ]

  const [exomeResponse, genomeResponse] = await Promise.all(
    requests.map(({ index, subset: requestSubset }) =>
      ctx.database.elastic.search({
        index,
        type: 'variant',
        _source: ['variant_id'],
        body: {
          query: {
            bool: {
              filter: [
                { term: { chrom } },
                { term: { pos } },
                { range: { [`${requestSubset}.AC_raw`]: { gt: 0 } } },
              ],
            },
          },
        },
      })
    )
  )

*/

/*
  // eslint-disable no-underscore-dangle
  const exomeVariants = exomeResponse.hits.hits.map(doc => doc._source.variant_id)
  const genomeVariants = genomeResponse.hits.hits.map(doc => doc._source.variant_id)
  // eslint-enable no-underscore-dangle 

  const combinedVariants = exomeVariants.concat(genomeVariants)

  return combinedVariants
    .filter(otherVariantId => otherVariantId !== variantId)
    .sort()
    .filter(
      (otherVariantId, index, allOtherVariantIds) =>
        otherVariantId !== allOtherVariantIds[index + 1]
    )
}
*/


const fetchVariantDetails = async (ctx, variantId) => {
  //const { exomeData, genomeData } = await fetchGnomadVariantData(ctx, variantId, subset)


  //if (!exomeData && !genomeData) {
  //  throw new UserVisibleError('Variant not found')
  //}

  //const sharedData = exomeData || genomeData

  //console.log("In here 1")
  const exomeData = await fetchVariantData(ctx, variantId)
  //console.log("In here 4")
  //console.log(exomeData)

  const sharedData = exomeData


  const sharedVariantFields = {
    alt: sharedData.alt,
    chrom: sharedData.chrom,
    pos: sharedData.pos,
    ref: sharedData.ref,
    variantId: sharedData.variant_id,
    xpos: sharedData.xpos,
  }

  /*
  const [colocatedVariants, multiNucleotideVariants] = await Promise.all([
    fetchColocatedVariants(ctx, variantId, subset),
    fetchGnomadMNVSummariesByVariantId(ctx, variantId),
  ])
  */

  return {
    gqlType: 'VariantDetails',
    // variant interface fields
    ...sharedVariantFields,
    // gnomAD specific fields
    haplotypes: formatHaplotypes(exomeData),
    ac: sharedData.ac,
    an: sharedData.an,
    //populations: formatPopulations(exomeData)

    /*
    age_distribution: {
      het: formatHistogram(sharedData.gnomad_age_hist_het),
      hom: formatHistogram(sharedData.gnomad_age_hist_hom),
    },
    colocatedVariants,
    multiNucleotideVariants,
    */
  /*    
    exome: exomeData
      ? {
          // Include variant fields so that the reads data resolver can access them.
          ...sharedVariantFields,
          //ac: exomeData.AC_adj.total,
          //an: exomeData.AN_adj.total,
          //ac_hemi: exomeData.nonpar ? exomeData.AC_adj.male : 0,
          //ac_hom: exomeData.nhomalt_adj.total,

          ac: exomeData.AC,
          an: exomeData.AN,
          //ac_hemi: exomeData.nonpar ? exomeData.AC_adj.male : 0,
          ac_hom: exomeData.nhomalt,

          
          //faf95: formatFilteringAlleleFrequency(exomeData, 'faf95_adj'),
          //faf99: formatFilteringAlleleFrequency(exomeData, 'faf99_adj'),
          //filters: exomeData.filters,
          populations: formatPopulations(exomeData),
          
          qualityMetrics: {
            alleleBalance: {
              alt: formatHistogram(exomeData.ab_hist_alt),
            },
            genotypeDepth: {
              all: formatHistogram(exomeData.dp_hist_all),
              alt: formatHistogram(exomeData.dp_hist_alt),
            },
            genotypeQuality: {
              all: formatHistogram(exomeData.gq_hist_all),
              alt: formatHistogram(exomeData.gq_hist_alt),
            },
            siteQualityMetrics: {
              ...exomeData.allele_info,
              pab_max: exomeData.pab_max,
              RF: exomeData.rf_tp_probability,
              SiteQuality: exomeData.qual,
            },
          },

        }
      : null,*/

    /*
    flags: ['lcr', 'segdup', 'lc_lof', 'lof_flag'].filter(flag => sharedData.flags[flag]),
    genome: genomeData
      ? {
          // Include variant fields so that the reads data resolver can access them.
          ...sharedVariantFields,
          ac: genomeData.AC_adj.total,
          an: genomeData.AN_adj.total,
          ac_hemi: genomeData.nonpar ? genomeData.AC_adj.male : 0,
          ac_hom: genomeData.nhomalt_adj.total,
          faf95: formatFilteringAlleleFrequency(genomeData, 'faf95_adj'),
          faf99: formatFilteringAlleleFrequency(genomeData, 'faf99_adj'),
          filters: genomeData.filters,
          populations: formatPopulations(genomeData),
          qualityMetrics: {
            alleleBalance: {
              alt: formatHistogram(genomeData.ab_hist_alt),
            },
            genotypeDepth: {
              all: formatHistogram(genomeData.dp_hist_all),
              alt: formatHistogram(genomeData.dp_hist_alt),
            },
            genotypeQuality: {
              all: formatHistogram(genomeData.gq_hist_all),
              alt: formatHistogram(genomeData.gq_hist_alt),
            },
            siteQualityMetrics: {
              ...genomeData.allele_info,
              pab_max: genomeData.pab_max,
              RF: genomeData.rf_tp_probability,
              SiteQuality: genomeData.qual,
            },
          },
        }
      : null,*/

    //rsid: sharedData.rsid,
    sortedTranscriptConsequences: sharedData.sortedTranscriptConsequences || [],
  }
}

export default fetchVariantDetails
