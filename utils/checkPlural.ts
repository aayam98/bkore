// Function to check if word is plural or singular
export const checkPlurality = (productName: string) => {
  // Common plural endings
  const pluralEndings = ['s', 'es', 'ies'];

  // Special cases for irregular plurals
  const irregularPlurals = {
    foot: 'feet',
    tooth: 'teeth',
    goose: 'geese',
    mouse: 'mice',
    person: 'people',
    child: 'children',
    ox: 'oxen',
  };

  // Function to clean the input
  const cleanWord = productName.trim().toLowerCase();

  // Check for irregular plurals
  for (const [singular, plural] of Object.entries(irregularPlurals)) {
    if (cleanWord === plural) return 'plural';
    if (cleanWord === singular) return 'singular';
  }

  // Handle words ending in 'y'
  if (cleanWord.endsWith('y')) {
    // If word ends in 'ey', 'ay', 'oy', 'uy' - just add 's' for plural
    const vowelY = ['ey', 'ay', 'oy', 'uy'];
    if (vowelY.some((ending) => cleanWord.endsWith(ending))) {
      return cleanWord.endsWith('s') ? 'plural' : 'singular';
    }
    // For words ending in consonant + 'y', check for 'ies' ending
    return cleanWord.endsWith('ies') ? 'plural' : 'singular';
  }

  // Check for words ending in 'f' or 'fe'
  if (cleanWord.endsWith('f') || cleanWord.endsWith('fe')) {
    return cleanWord.endsWith('ves') ? 'plural' : 'singular';
  }

  // Check common plural endings
  if (cleanWord.endsWith('es')) {
    // Handle special cases where 'es' is part of the singular word
    const esExceptions = ['series', 'species', 'glasses'];
    if (esExceptions.includes(cleanWord)) return 'singular';
    return 'plural';
  }

  // Simple 's' check as last resort
  return cleanWord.endsWith('s') ? 'plural' : 'singular';
};

// Function to convert plural to singular
export const toSingular = (productName: string) => {
  // Clean the input
  const word = productName.trim();
  const lowerWord = word.toLowerCase();

  // If it's already singular, return as is
  if (checkPlurality(word) === 'singular') {
    return word;
  }

  // Handle irregular plurals
  const irregularPlurals = {
    feet: 'foot',
    teeth: 'tooth',
    geese: 'goose',
    mice: 'mouse',
    people: 'person',
    children: 'child',
    oxen: 'ox',
  };
//@ts-ignore
  if (irregularPlurals[lowerWord]) {
    // Preserve original capitalization
    if (word[0] === word[0].toUpperCase()) {
      return (//@ts-ignore
        irregularPlurals[lowerWord].charAt(0).toUpperCase() +//@ts-ignore
        irregularPlurals[lowerWord].slice(1)
      );
    }//@ts-ignore
    return irregularPlurals[lowerWord];
  }

  // Handle common plural patterns
  if (lowerWord.endsWith('ies')) {
    // Handle words ending in 'ies'
    const vowelY = ['eys', 'ays', 'oys', 'uys'];
    if (vowelY.some((ending) => lowerWord.endsWith(ending))) {
      return word.slice(0, -1);
    }
    return word.slice(0, -3) + 'y';
  }

  if (lowerWord.endsWith('ves')) {
    // Check if original word likely ended in 'fe'
    if (
      ['wive', 'live', 'knive'].some((stem) => lowerWord.endsWith(stem + 's'))
    ) {
      return word.slice(0, -3) + 'fe';
    }
    return word.slice(0, -3) + 'f';
  }

  if (lowerWord.endsWith('es')) {
    // Handle special cases
    const esExceptions = ['series', 'species', 'glasses'];
    if (esExceptions.includes(lowerWord)) {
      return word;
    }

    // Common 'es' endings
    const esEndings = ['sses', 'shes', 'ches', 'xes'];
    if (esEndings.some((ending) => lowerWord.endsWith(ending))) {
      return word.slice(0, -2);
    }
  }

  // Default case: remove trailing 's'
  if (lowerWord.endsWith('s')) {
    return word.slice(0, -1);
  }

  return word;
};
