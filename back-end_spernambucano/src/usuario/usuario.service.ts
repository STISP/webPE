import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async cadastrar(usuario: Usuario): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(usuario.senha, 8);
    usuario.senha = hashedPassword;
    //criptografar usuario.id tambem
    return this.usuarioRepository.save(usuario);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return !!usuario;
  }

  async login(email: string, senha: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return false;
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    return isMatch;
  }

  async getNome(email: string): Promise<string | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario ? usuario.name : null;
  }

  // permições de acesso do novo usuario para as entidades cadastroNovoUsuario, acessoContratos, acessoAdicionarContratos, acessoDeletarContratos. quero individualmente
  async getCadastroNovoUsuario(email: string): Promise<boolean | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario ? usuario.cadastroNovoUsuario : null;
  }
  
  async getAcessoContratos(email: string): Promise<boolean | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario ? usuario.acessoContratos : null;
  }

  async getAcessoAdicionarContratos(email: string): Promise<boolean | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario ? usuario.acessoAdicionarContratos : null;
  }

  async getAcessoDeletarContratos(email: string): Promise<boolean | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario ? usuario.acessoDeletarContratos : null;
  }

}