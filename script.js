const consonants = {
  "ksh": "क्ष", "gya": "ज्ञ", "sh": "श", "chh": "छ", "ch": "च", "jh": "झ",
  "kh": "ख", "gh": "घ", "th": "थ", "dh": "ध", "ph": "फ", "bh": "भ",
  "ng": "ङ", "ny": "ञ", "tra": "त्र",
  "k": "क", "g": "ग", "t": "त", "d": "द", "n": "न", "p": "प", "b": "ब",
  "m": "म", "y": "य", "r": "र", "l": "ल", "v": "व", "w": "व", "s": "स", "h": "ह", "z": "ज़", "j": "ज", "c": "क"
};

const standaloneVowels = {
  "aa": "आ", "a": "अ",
  "ii": "ई", "i": "इ",
  "uu": "ऊ", "u": "उ",
  "e": "ए", "ai": "ऐ",
  "o": "ओ", "au": "औ"
};

const matras = {
  "aa": "ा", "ii": "ी", "i": "ि", "uu": "ू", "u": "ु",
  "e": "े", "ai": "ै", "o": "ो", "au": "ौ"
};

function transliterate(input) {
  let result = "";
  let i = 0;

  while (i < input.length) {
    let matched = false;

    // Try consonant + matra
    for (let cLen = 3; cLen > 0; cLen--) {
      const consonantChunk = input.substring(i, i + cLen).toLowerCase();
      if (consonants[consonantChunk]) {
        for (let vLen = 2; vLen > 0; vLen--) {
          const vowelChunk = input.substring(i + cLen, i + cLen + vLen).toLowerCase();
          if (matras[vowelChunk]) {
            result += consonants[consonantChunk] + matras[vowelChunk];
            i += cLen + vLen;
            matched = true;
            break;
          }
        }

        if (!matched) {
          // If no vowel follows, implicit 'a'
          result += consonants[consonantChunk];
          i += cLen;
          matched = true;
        }

        break;
      }
    }

    if (matched) continue;

    // Try standalone vowels
    for (let len = 2; len > 0; len--) {
      const vowelChunk = input.substring(i, i + len).toLowerCase();
      if (standaloneVowels[vowelChunk]) {
        result += standaloneVowels[vowelChunk];
        i += len;
        matched = true;
        break;
      }
    }

    // Default fallback
    if (!matched) {
      result += input[i];
      i++;
    }
  }

  return result;
}

// Hook up to DOM
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("romanInput");
  const output = document.getElementById("unicodeOutput");

  input.addEventListener("input", () => {
    const value = input.value;
    const unicode = transliterate(value);
    output.textContent = unicode;
  });
});
