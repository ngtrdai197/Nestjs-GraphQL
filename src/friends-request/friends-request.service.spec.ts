import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRequestService } from './friends-request.service';

describe('FriendsRequestService', () => {
  let service: FriendsRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsRequestService],
    }).compile();

    service = module.get<FriendsRequestService>(FriendsRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
