class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  familyLine() {
    let arr = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      arr.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }
    return arr.reverse();
  }

  closestCommonAncestor(vampire) {
    let familyLine = this.familyLine();
    let vampireFamilyLine = vampire.familyLine();

    let shortestFamilyLine =
      familyLine.length < vampireFamilyLine.length
        ? familyLine
        : vampireFamilyLine;

    for (let i = 0; i < shortestFamilyLine.length; i++) {
      if (familyLine[i] !== vampireFamilyLine[i]) {
        return familyLine[i - 1];
      }
    }
    return shortestFamilyLine[shortestFamilyLine.length - 1];

    // andrew: original, ansel, elgort, andrew;
    // sarah: original, ansel, sarah;
    // ansel: original, ansel;
    // bart: original, bart;
    // original: original
  }
}

module.exports = Vampire;
