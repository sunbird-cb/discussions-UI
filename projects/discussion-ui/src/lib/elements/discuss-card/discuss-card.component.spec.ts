import { DiscussCardComponent } from "./discuss-card.component"

describe('DiscussCardComponent', () => {
  let discussCardComponent: DiscussCardComponent

  beforeAll(() => {
    discussCardComponent = new DiscussCardComponent();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of DiscussHomeComponent', () => {
    expect(discussCardComponent).toBeTruthy();
  });

})
