const consonants = {
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
  'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
  'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'ś': 'श',
  'ṣ': 'ष', 's': 'स', 'h': 'ह', 'kṣ': 'क्ष', 'jñ': 'ज्ञ',
};

const independentVowels = {
  'a': 'अ', 'ā': 'आ', 'i': 'इ', 'ī': 'ई', 'u': 'उ',
  'ū': 'ऊ', 'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  'ṛ': 'ऋ',
};

const vowelSigns = {
  'a': '',     // implicit vowel, no sign
  'ā': 'ा',
  'i': 'ि',
  'ī': 'ी',
  'u': 'ु',
  'ū': 'ू',
  'e': 'े',
  'ai': 'ै',
  'o': 'ो',
  'au': 'ौ',
  'ṛ': 'ृ',
};

function transliterateWord(word) {
  let result = '';

  let i = 0;
  const length = word.length;
  let tokens = [];

  while (i < length) {
    // 3-char consonants (rare)
    if (i + 3 <= length && consonants[word.substring(i, i + 3)]) {
      tokens.push({type: 'consonant', value: word.substring(i, i + 3)});
      i += 3;
    }
    // 2-char consonants
    else if (i + 2 <= length && consonants[word.substring(i, i + 2)]) {
      tokens.push({type: 'consonant', value: word.substring(i, i + 2)});
      i += 2;
    }
    // 2-char vowels (ai, au)
    else if (i + 2 <= length && vowelSigns[word.substring(i, i + 2)]) {
      tokens.push({type: 'vowel', value: word.substring(i, i + 2)});
      i += 2;
    }
    // 1-char consonant
    else if (consonants[word[i]]) {
      tokens.push({type: 'consonant', value: word[i]});
      i++;
    }
    // 1-char vowel
    else if (vowelSigns[word[i]]) {
      tokens.push({type: 'vowel', value: word[i]});
      i++;
    }
    else {
      tokens.push({type: 'other', value: word[i]});
      i++;
    }
  }

  // Independent vowel if word starts with vowel
  if (tokens.length > 0 && tokens[0].type === 'vowel') {
    result += independentVowels[tokens[0].value] || '';
    tokens.shift();
  }

  for (let i = 0; i < tokens.length; i++) {
    let t = tokens[i];
    if (t.type === 'consonant') {
      // look ahead vowel sign
      let vowel = 'a'; // implicit vowel
      if (i + 1 < tokens.length && tokens[i + 1].type === 'vowel') {
        vowel = tokens[i + 1].value;
        i++;
      }
      let consChar = consonants[t.value] || '';
      let vowelSign = vowelSigns[vowel] || '';

      // special case for 'ि' vowel sign which goes before consonant in Unicode
      if (vowelSign === 'ि') {
        result += vowelSign + consChar;
      } else {
        result += consChar + vowelSign;
      }
    }
    else if (t.type === 'vowel') {
      result += independentVowels[t.value] || '';
    }
    else {
      result += t.value;
    }
  }

  return result;
}

function transliterate(text) {
  const words = text.toLowerCase().split(/\s+/);
  return words.map(transliterateWord).join(' ');
}

const inputBox = document.getElementById('inputText');
const outputDiv = document.getElementById('output');

inputBox.addEventListener('input', () => {
  outputDiv.textContent = transliterate(inputBox.value);
});
