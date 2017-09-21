/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */

export const POPULATIONS = {
  AFR: 'African',
  ASJ: 'Ashkenazy Jewish',
  EAS: 'East Asian',
  FIN: 'European (Finnish)',
  NFE: 'European',
  LAT: 'Latvian',
  SAS: 'South asian',
  OTH: 'Other',
  UNK: 'Unknown',
}

export const COHORTS = {
  RBH: 'Royal Brompton ',
  EGY: 'Egypt',
  SGP: 'Singapore',
  LMM: 'LMM',
  OMG: 'Oxford',
}

export const STATS = {
  AC: 'Allele count',
  AN: 'Allele number',
  HH: 'Zygosity',
}

export const DISEASES = {
  DCM: 'Dilated cardiomyopathy',
  HCM: 'Hypertrophic cardiomyopathy',
  HVO: 'Healthy',
}

export const AGE_BINS = ['0_10', '11_20', '21_30', '31_40', '41_50', '51_60', '61_70', '71_80', '81_90']

export function groupFieldsByDisease (variant) {
  return Object.keys(DISEASES).reduce((acc_disease, disease) => {
    acc_disease[disease] = Object.keys(variant).reduce((acc_disease_field, vfield) => {
      if (vfield.includes(disease)) {
        // acc_disease_field[vfield] = variant[vfield]
        const ages = AGE_BINS.map((bin) => {
          return variant[`RBH_${disease}_${bin}_AC`]
        })

        const cohorts = Object.keys(COHORTS).reduce((acc_cohorts, cohort) => {
          return {
            [cohort]: {
              populations: Object.keys(POPULATIONS).reduce((acc_populations, population) => {
                let pop_ac
                let pop_an
                let pop_freq
                if (variant[`${cohort}_${disease}_${population}_AN`]) {
                  pop_ac = variant[`${cohort}_${disease}_${population}_AC`]
                  pop_an = variant[`${cohort}_${disease}_${population}_AN`]
                  pop_freq = pop_ac / pop_an
                }
                acc_populations[population] = { pop_ac, pop_an, pop_freq }
                return acc_populations
              }, {}),

              zygosity: variant[`${cohort}_${disease}_HH`],

              cohort_totals: Object.keys(POPULATIONS).reduce((cohort_counts, population) => {
                let pop_ac
                let pop_an
                let pop_freq
                if (variant[`${cohort}_${disease}_${population}_AN`]) {
                  pop_ac = variant[`${cohort}_${disease}_${population}_AC`]
                  pop_an = variant[`${cohort}_${disease}_${population}_AN`]
                  return {
                    allele_count: cohort_counts.allele_count + pop_ac,
                    allele_num: cohort_counts.allele_num + pop_an,
                  }
                }
                return cohort_counts
              }, { allele_count: 0, allele_num: 0 }),
            },
            ...acc_cohorts,
          }
        }, {})
        const disease_totals = Object.keys(COHORTS).reduce((disease_counts, cohort) => {
          return {
            allele_count: (
              disease_counts.allele_count +
              cohorts[cohort].cohort_totals.allele_count
            ),
            allele_num: disease_counts.allele_num + cohorts[cohort].cohort_totals.allele_num,
          }
        }, { allele_count: 0, allele_num: 0 })
        return {
          disease_totals,
          ages,
          cohorts,
        }
      }
      return acc_disease_field
    }, {})
    return acc_disease
  }, {})
}

export function processCardioVariant(rawVariant) {
  const {
    variant_id,
    chrom,
    ref,
    alt,
    rsid,
    filter,
    pos,
    xpos,
    ENST,
    Consequence,
    SYMBOL,
    SYMBOL_SOURCE,
    ENSG,
    Feature,
    BIOTYPE,
    HGVSc,
    HGVSp,
    cDNA_position,
    CDS_position,
    Protein_position,
    Amino_acids,
    Codons,
    Existing_variation,
    STRAND,
    CANONICAL,
    CCDS,
    ENSP,
    SIFT,
    PolyPhen,
    ExAC_MAF,
    PUBMED,
    ...rest
  } = rawVariant
  return {
    variant_id,
    chrom,
    ref,
    alt,
    rsid,
    filter,
    pos,
    xpos,
    ENST,
    Consequence,
    SYMBOL,
    SYMBOL_SOURCE,
    ENSG,
    Feature,
    BIOTYPE,
    HGVSc,
    HGVSp,
    cDNA_position,
    CDS_position,
    Protein_position,
    Amino_acids,
    Codons,
    Existing_variation,
    STRAND,
    CANONICAL,
    CCDS,
    ENSP,
    SIFT,
    PolyPhen,
    ExAC_MAF,
    PUBMED,
    diseases: groupFieldsByDisease(rest),
  }
}

const lof = ['splice_acceptor_variant', 'splice_donor_variant', 'stop_gained', 'frameshift_variant']
const missense = ['missense_variant']

const categories = { lof, missense }

function getCohortCountsByCategory(category, breakdown, variant) {
  const cohortBreakdown = Object.keys(COHORTS).reduce((cohort_acc, cohort) => {
    let previousCount = 0
    if (breakdown[category]) {
      previousCount = breakdown[category][cohort]
    }
    const { allele_count, allele_num } = variant.diseases.HCM.cohorts[cohort].cohort_totals
    if (category === 'all') {
      return {
        ...cohort_acc,
        [cohort]: previousCount + allele_count
      }
    }
    return {
      ...cohort_acc,
      [cohort]: categories[category].indexOf(variant.Consequence) > -1
        ? previousCount + allele_count : previousCount,
    }
  }, Object.keys(COHORTS).reduce((acc, cohort) => ({ [cohort]: 0, ...acc }), {}))
  return cohortBreakdown
}

export function getConsequenceBreakdown (rawVariants) {
  return rawVariants.reduce((breakdown, rawVariant) => {
    const variant = processCardioVariant(rawVariant)
    return {
      all: getCohortCountsByCategory('all', breakdown, variant),
      lof: getCohortCountsByCategory('lof', breakdown, variant),
      missense: getCohortCountsByCategory('missense', breakdown, variant),
    }
  }, {})
}

export const GENE_DISEASE_INFO = [
  {
    'Disease': 'HCM',
    'Gene': 'MYH7',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Gain of function',
    'VariantClasses': 'missense*'
  },
  {
    'Disease': 'HCM',
    'Gene': 'TNNT2',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Gain of function',
    'VariantClasses': 'missense*'
  },
  {
    'Disease': 'HCM',
    'Gene': 'MYL3',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Gain of function',
    'VariantClasses': 'missense'
  },
  {
    'Disease': 'HCM',
    'Gene': 'ACTC1',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Gain of function',
    'VariantClasses': 'missense'
  },
  {
    'Disease': 'HCM',
    'Gene': 'FHL1',
    'InheritanceMode': 'XL',
    'DiseaseMechanism': 'Gain of function',
    'VariantClasses': 'non-truncating'
  },
  {
    'Disease': 'HCM',
    'Gene': 'MYBPC3',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Loss of function',
    'VariantClasses': '\'frameshift, splicing site, exonic deletion and nonsense*\''
  },
  {
    'Disease': 'HCM',
    'Gene': 'MYL2',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Loss of function',
    'VariantClasses': 'missense'
  },
  {
    'Disease': 'HCM',
    'Gene': 'CSRP3',
    'InheritanceMode': 'AD',
    'DiseaseMechanism': 'Loss of function',
    'VariantClasses': 'missense'
  }
]
