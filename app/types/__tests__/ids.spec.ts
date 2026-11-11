import type { Project } from '../projects';
import type { Component, ComponentCategory, ComponentOrigin } from '../component';
import type { CardData } from '../card';
import { mapApiComponentToCardData } from '../card';

// Compile-time contract (checked by `tsc --noEmit`): entity ids are UUID v7 strings.
const UUID = '0190a5d0-0000-7000-8000-000000000001';

describe('entity ids are strings', () => {
  it('Project and its user', () => {
    const project: Project = {
      id: UUID,
      user: { id: UUID, email: 'a@b.c', profile: { firstName: 'Ana', photoUrl: null } },
      title: 't',
      description: 'd',
      createdAt: '',
      updatedAt: '',
      imageUrl: '',
      comments: [],
      components: [],
    };
    expect(typeof project.id).toBe('string');
    expect(typeof project.user.id).toBe('string');
  });

  it('Component keeps its UUID id through mapApiComponentToCardData', () => {
    const component: Component = {
      id: UUID,
      name: 'n',
      description: 'd',
      origin: 'homemade' as ComponentOrigin,
      category: 'frame' as ComponentCategory,
      photoS3Key: '',
      photoMimeType: 'image/png',
      photoSize: 1,
      createdAt: new Date(),
    };
    const card: CardData = mapApiComponentToCardData(component);
    expect(card.id).toBe(UUID);
  });
});
