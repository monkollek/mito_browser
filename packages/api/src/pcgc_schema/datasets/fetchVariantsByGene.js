import { fetchAllSearchResults } from '../../utilities/elasticsearch'
import { mergeOverlappingRegions } from '../../utilities/region'
import { lookupExonsByGeneId } from '../types/exon'
//import { request } from "graphql-request"
/*
import {
  annotateVariantsWithMNVFlag,
  fetchGnomadMNVsByIntervals,
} from './gnomadMultiNucleotideVariants'
*/

import mergePcgcAndGnomadVariantSummaries from './mergePcgcAndGnomadVariants'
import shapeGnomadVariantSummary from './shapeGnomadVariantSummary'

const fetchVariantsByGene = async (ctx, geneId, canonicalTranscriptId, subset) => {
  const geneExons = await lookupExonsByGeneId(ctx.database.gnomad, geneId)
  const filteredRegions = geneExons.filter(exon => exon.feature_type === 'CDS')
  const sortedRegions = filteredRegions.sort((r1, r2) => r1.xstart - r2.xstart)
  const padding = 75
  const paddedRegions = sortedRegions.map(r => ({
    ...r,
    start: r.start - padding,
    stop: r.stop + padding,
    xstart: r.xstart - padding,
    xstop: r.xstop + padding,
  }))

  const mergedRegions = mergeOverlappingRegions(paddedRegions)

  const rangeQueries = mergedRegions.map(region => ({
    range: {
      pos: {
        gte: region.start,
        lte: region.stop,
      },
    },
  }))

/*
  const requests = [
    { index: 'gnomad_exomes_2_1_1', subset },
    // All genome samples are non_cancer, so separate non-cancer numbers are not stored
    { index: 'gnomad_genomes_2_1_1', subset: subset === 'non_cancer' ? 'gnomad' : subset },
  ]
*/
  /*
  const [exomeVariants, genomeVariants] = await Promise.all(
    requests.map(async ({ index, subset }) => {
      const hits = await fetchAllSearchResults(ctx.database.elastic, {
        index,
        type: 'variant',
        size: 10000,
        _source: [
          //`${subset}.AC_adj`,
          //`${subset}.AN_adj`,
          //`${subset}.nhomalt_adj`,
          'alt',
          'chrom',
          'filters',
          'flags',
          //'nonpar',
          'pos',
          'ref',
          'rsid',
          'sortedTranscriptConsequences',
          'variant_id',
          'xpos',
        ],
        body: {
          query: {
            bool: {
              filter: [
                {
                  nested: {
                    path: 'sortedTranscriptConsequences',
                    query: {
                      term: { 'sortedTranscriptConsequences.gene_id': geneId },
                    },
                  },
                },
                { bool: { should: rangeQueries } },
                { range: { [`${subset}.AC_raw`]: { gt: 0 } } },
              ],
            },
          },
          sort: [{ pos: { order: 'asc' } }],
        },
      })

      return hits.map(shapeGnomadVariantSummary(subset, { type: 'gene', geneId }))

    })
  )*/

  //await Promise.all(
//    const hits = fetchAllSearchResults(ctx.database.elastic, {


  const hits = await fetchAllSearchResults(ctx.database.elastic, { 
//      index: 'pcgc_chr20_test',
      index: 'gnomad_mt',
      type: 'variant',
      size: 10000,
      _source: [
        'alt',
        'chrom',
        'filters',
//        'flags',
        //'nonpar',
        'pos',
        'ref',
//        'rsid',
        'sortedTranscriptConsequences',
        'variant_id',
        'xpos',
        'ac_high',
        'ac_low',
        'max_vl',
        'af'
      ],
      body: {
        query : {
          nested: {
            path: 'sortedTranscriptConsequences',
            query:{
              match: {
                'sortedTranscriptConsequences.gene_id': geneId
              }
            }
          }
        },
        sort: [{ pos: { order: 'asc' } }],
      },
    })

  const exomeVariants = hits.map(shapeGnomadVariantSummary({ type: 'gene', geneId }))


  //const combinedVariants = mergeExomeAndGenomeVariantSummaries(exomeVariants, genomeVariants)

  // TODO: This can be fetched in parallel with exome/genome data
  //const mnvs = await fetchGnomadMNVsByIntervals(ctx, mergedRegions)
  //annotateVariantsWithMNVFlag(combinedVariants, mnvs)
  //console.log("In here")
  //console.log(exomeVariants)
  //console.log("In here2")
  
  //console.log(combinedVariants.length)
  //console.log(exomeVariants.length)

  return exomeVariants
  //const variantData = exomeVariants._source

/*
  return {
    // Variant ID fields
    alt: variantData.alt,
    chrom: variantData.chrom,
    pos: variantData.pos,
    ref: variantData.ref,
    variantId: variantData.variant_id,
    xpos: variantData.xpos
  }*/

}

export default fetchVariantsByGene
