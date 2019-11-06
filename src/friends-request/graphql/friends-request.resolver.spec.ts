import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRequestResolver } from './friends-request.resolver';

describe('FriendsRequestResolver', () => {
  let resolver: FriendsRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsRequestResolver],
    }).compile();

    resolver = module.get<FriendsRequestResolver>(FriendsRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
