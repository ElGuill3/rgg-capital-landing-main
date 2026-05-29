import test from "node:test";
import assert from "node:assert/strict";
import translationsModule from "./translations.js";

// Note: translations.js exports { en, es } by default or as named, let's verify how it exports.
// In main workspace, lines 587: export default { en, es }; but let's check NAV_TREE too.
// Wait, translations.js has:
// const NAV_TREE = [...];
// and under en/es, navTree: NAV_TREE.
// So translationsModule.default.en.hub.navTree is NAV_TREE.

test("NAV_TREE contains rgg-team and not system", () => {
  const defaultExport = translationsModule;
  const enTree = defaultExport.en.hub.navTree;
  
  const systemPillar = enTree.find(p => p.pillarId === "system");
  const teamPillar = enTree.find(p => p.pillarId === "rgg-team");
  
  assert.equal(systemPillar, undefined, "Should not contain 'system' pillar");
  assert.notEqual(teamPillar, undefined, "Should contain 'rgg-team' pillar");
  assert.equal(teamPillar.labelKey, "rggTeam");
  assert.deepEqual(teamPillar.subItems, [], "Should have no subItems");
});

test("en and es translations have rggTeam under nav and sections", () => {
  const defaultExport = translationsModule;
  
  // English check
  assert.notEqual(defaultExport.en.hub.nav.rggTeam, undefined, "en.hub.nav should have rggTeam");
  assert.notEqual(defaultExport.en.hub.sections.rggTeam, undefined, "en.hub.sections should have rggTeam");
  
  // Spanish check
  assert.notEqual(defaultExport.es.hub.nav.rggTeam, undefined, "es.hub.nav should have rggTeam");
  assert.notEqual(defaultExport.es.hub.sections.rggTeam, undefined, "es.hub.sections should have rggTeam");
});

test("rggTeam contains localized profiles for Rodrigo, Mario, Guillermo, and Emiliano", () => {
  const defaultExport = translationsModule;
  
  for (const locale of [defaultExport.en, defaultExport.es]) {
    const teamSection = locale.hub.sections.rggTeam;
    assert.notEqual(teamSection, undefined);
    assert.notEqual(teamSection.title, undefined);
    assert.notEqual(teamSection.lead, undefined);
    
    // Check that we have the member information defined
    const members = teamSection.members;
    assert.notEqual(members, undefined);
    assert.equal(members.length, 4);
    
    const names = members.map(m => m.name);
    assert.ok(names.some(n => n.includes("Rodrigo")));
    assert.ok(names.some(n => n.includes("Mario")));
    assert.ok(names.some(n => n.includes("Guillermo")));
    assert.ok(names.some(n => n.includes("Emiliano")));
  }
});

test("en and es translations have rggAws and foundationAws", () => {
  const defaultExport = translationsModule;
  
  // English check
  assert.notEqual(defaultExport.en.hub.navSub.foundationAws, undefined, "en.hub.navSub should have foundationAws");
  assert.notEqual(defaultExport.en.hub.sections.rggAws, undefined, "en.hub.sections should have rggAws");
  
  // Spanish check
  assert.notEqual(defaultExport.es.hub.navSub.foundationAws, undefined, "es.hub.navSub should have foundationAws");
  assert.notEqual(defaultExport.es.hub.sections.rggAws, undefined, "es.hub.sections should have rggAws");
});

