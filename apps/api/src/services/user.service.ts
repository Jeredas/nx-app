import { Role } from'@nx-test/shared-models';
import { UserRole } from '@nx-test/shared-models';
import { User } from '@nx-test/shared-models';
import { CreateUserDto } from '@nx-test/shared-dto';
import * as bcrypt from 'bcrypt';

class UserService {
  public getUsers = async () => {
    let candidates: User[];
    try {
      candidates = await User.findAll({
        include: {
          model: Role,
          through: {
            attributes: [/* list the wanted attributes here */]
          }
        }
      });
      return { status: 200, message: "Success", user: candidates };
    } catch (err) {
      return err;
    }
  };

  public async getUserById(userId: number) {
    let candidate: User | null;
    try {
      candidate = await User.findOne({
        where: {
          id: userId,
        },
        include: {
          model: Role,
        },
      });
      return { status: 200, message: "created", user: candidate };
    } catch (err) {
      return err;
    }
  }

  public async createUser(userDto: CreateUserDto) {
    let candidate: User | null;
    let dublicate: User | null;
    try {
      dublicate = await User.findOne({
        where: {
          email: userDto.email,
        },
      });
    } catch (err) {
      throw new Error(err.message)
    }
    if (dublicate) {
      throw new Error("User with this email already exists") ;
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userDto.password,salt)
      console.log(hashedPassword)
      // @ts-ignore
      candidate = await User.create({
        ...userDto,
        password: hashedPassword,
      });
      await UserRole.create({
        user_id: candidate.id,
        role_id: 2,
      });
      return candidate;
    } catch (err) {
      throw new Error(err.message) ;
    }
  }
}


const userService = new UserService();

export default userService;
